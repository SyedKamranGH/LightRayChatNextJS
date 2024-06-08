import { Log } from 'debug-next'

import axiosInstance from '@/utils/axios'

import { formatStreamResponse } from '@/utils/formatStreamResponse'
import { TChatType } from './chat.types'

const { logError } = Log()

export interface IChat {
    chatId: string
    title: string
    createdAt: string
    updatedAt: string
    lastMessage: string
    chatType: TChatType
    documents: string[]
    headlines?: string[]
}

interface IChatHistory {
    chats: IChat[]
}

export const getChatHistory = Object.freeze({
    queryKey: `/v1/chat`,
    queryFn: async (
        chatType: TChatType | `${TChatType},${TChatType},${TChatType},${TChatType},${TChatType}`,
    ): Promise<IChat[]> => {
        const response = await axiosInstance.get<{ result: IChatHistory }>(
            `/v1/chat?chatTypes=${chatType}`,
        )
        const result = response.data.result

        return result.chats
    },
})

export interface IChatCompletionResponse {
    message: {
        role: 'system'
        content: string
        citations?: TCitationRef[]
    }
    id: string
    created: number
    object: 'chat.completion'
    model: string
}

export type TCitationRef =
    | { citationType: 'WEB_PAGE'; url: string }
    | { citationType: 'PDF'; citationFilename?: string; url: string }

type TChatCompletionStreamChunk = {
    id: string
    delta: { content: string } | { citations: TCitationRef[] }
    created: number
    object: 'chat.completion.chunk'
    model: string
}

type TCompletionStreamError = {
    object: 'error'
    error: unknown
}

export type TChatCompletionStreamResponse = TChatCompletionStreamChunk | TCompletionStreamError

export type TCreateCompletionRequest = {
    chatId?: string
    searchType?: undefined
    message: { role: 'user'; content: string }
}

export const createChatCompletion = Object.freeze({
    url: '/v1/chat/completion',
    mutationKey: '/v1/chat/completion',
    /**
     * Access the response stream by defining `options.onUpdate`
     * @param payload - Message Request
     * @param onUpdate - Callback function to trigger on new streaming result
     * @returns
     */
    mutationFn: async (
        payload: TCreateCompletionRequest,
        signal: AbortSignal,
        onUpdate: (response: IChatCompletionResponse) => void,
    ): Promise<IChatCompletionResponse> => {
        // Axios browser has a quirk in handling streams.
        // It joins all the data back, but we don't want that.
        // So we use buffer const to unwind it.
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: createChatCompletion.url,
            headers: { 'Content-Type': 'application/json' },
            data: payload,
            onDownloadProgress: progressEvent => {
                if (typeof progressEvent.event.currentTarget.response !== 'string') {
                    logError(`${progressEvent.event.currentTarget.response} is not a string.`)
                    throw new Error('progressEvent response is not a string.')
                }
                // unwind axios joined stream
                const data = progressEvent.event.currentTarget.response.replace(buffer, '')

                // This function will throw an error if it finds an error chunk in the stream.
                const response = formatStreamResponse(data)

                // sometimes, the response merge two chunks and one object contains
                // both content and citations. To is to separate this behaviour so that
                // our down stream onUpdate handler can handle correctly
                if (response.message.content.length > 0 && response.message.citations) {
                    const { role, citations, content } = response.message

                    onUpdate({ ...response, message: { role, content } })
                    onUpdate({ ...response, message: { role, content: '', citations } })
                } else {
                    onUpdate(response)
                }

                // add the data back to the buffer
                buffer = `${buffer}${data}`
            },
            signal,
        })

        return formatStreamResponse(response.data)
    },
})

type TRenameChatTitleRequest = {
    chatId: string
    newTitle: string
}
export const renameChatTitle = Object.freeze({
    url: '/v1/chat/title',
    mutationKey: '/v1/chat/title',
    mutationFn: async ({ chatId, newTitle }: TRenameChatTitleRequest) => {
        const response = await axiosInstance<IChat>({
            method: 'PUT',
            url: renameChatTitle.url,
            headers: { 'Content-Type': 'application/json' },
            data: { chatId, newTitle },
        })

        return response.data
    },
})

type TRemoveChatRequest = {
    chatId: string
}
export const removeChat = Object.freeze({
    mutationKey: '/v1/chat/remove',
    mutationFn: async ({ chatId }: TRemoveChatRequest) => {
        return await axiosInstance.delete(`/v1/chat/remove/${chatId}`)
    },
})

type TGetUploadedDocumentsRequest = {
    chatId: string
}
export type TGetDocumentsInChatResponse = {
    documents: {
        failReason: string
        status: string
        _id: string
        filename: string
        size: number
        mimetype: string
    }[]
}

export const getUploadedDocumentsInChat = Object.freeze({
    queryKey: `/v1/chat/documents`,
    queryFn: async ({ chatId }: TGetUploadedDocumentsRequest) => {
        const response = await axiosInstance.get<{ result: TGetDocumentsInChatResponse }>(
            `/v1/chat/documents?chatId=${chatId}`,
        )

        return response.data.result.documents
    },
})

/**
 * This is to remove the document uploaded inside a chat.
 */
export const removeUploadedDocument = Object.freeze({
    mutationKey: `/v1/chat/documents`,
    mutationFn: async (chatId: string, fileId: string) => {
        await axiosInstance.delete(`/v1/chat/documents`, {
            data: { chatId, fileId },
        })
    },
})

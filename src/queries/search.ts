import { Log } from 'debug-next'

import type { TSystemMessage } from '@/queries/messages'
import axiosInstance from '@/utils/axios'
import { formatStreamResponse } from '@/utils/formatStreamResponse'

import type { TChatType } from './chat.types'

const { logError } = Log()

interface IChat {
    _id: string
    chatType: TChatType
    title: string
    createdAt: string
    updatedAt: string
}

interface IChatHistory {
    chats: IChat[]
}

export const getChatHistory = Object.freeze({
    queryKey: `/v1/chat`,
    queryFn: async (): Promise<IChat[]> => {
        const response = await axiosInstance.get<{ result: IChatHistory }>(`/v1/chat`)
        const result = response.data.result

        return result.chats || []
    },
})

export interface IChatCompletionResponse {
    message: TSystemMessage
    id: string
    created: number
    object: 'chat.completion'
    model: string
}

export interface IChatCompletionStreamResponse {
    delta: {
        content: string
    }
    id: string
    created: number
    object: 'chat.completion.chunk'
    model: string
    isNewMessage?: boolean
}

export type TCreateSearchRequest = {
    chatId?: string
    message: { role: 'user'; content: string }
    searchType: 'GOOGLE_SEARCH'
}

export const createSearchCompletion = Object.freeze({
    mutationKey: '/v1/search/completion',
    /**
     * Access the response stream by defining `options.onUpdate`
     * @param payload - Message Request
     * @param onUpdate - Callback function to trigger on new streaming result
     * @returns
     */
    mutationFn: async (
        payload: TCreateSearchRequest,
        signal: AbortSignal,
        onUpdate: (response: IChatCompletionResponse) => void,
    ): Promise<IChatCompletionResponse> => {
        // Axios browser has a quirk in handling streams.
        // It joins all the data back, but we don't want that.
        // So we use buffer const to unwind it.
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: `/v1/search/completion`,
            headers: { 'Content-Type': 'application/json' },
            data: payload,
            signal,
            onDownloadProgress: progressEvent => {
                if (typeof progressEvent.event.currentTarget.response !== 'string') {
                    logError(`${progressEvent.event.currentTarget.response} is not a string.`)
                    throw new Error('progressEvent response is not a string.')
                }
                // unwind axios joined stream
                const data = progressEvent.event.currentTarget.response.replace(buffer, '')

                const response = formatStreamResponse(data)
                onUpdate(response)

                // add the data back to the buffer
                buffer = `${buffer}${data}`
            },
        })

        return formatStreamResponse(response.data)
    },
})

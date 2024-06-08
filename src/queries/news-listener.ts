import { IApiResponse } from '@/types/IAxiosApiResponse'
import axiosInstance from '@/utils/axios'
import { formatStreamResponse } from '@/utils/formatStreamResponse'
import { Log } from 'debug-next'

import { IChat, IChatCompletionResponse, TChatCompletionStreamResponse } from '@/queries/chat'
import { TMessage, TSystemMessage } from './messages'

const { logError } = Log()

export type TRegisterNewsTopicsRequest = {
    headlines: string[]
}

export type TRegisterNewsTopicsResponse = {
    id: string
    delta: {
        content: string
    }
    created: number
    object: 'chat.completion.chunk'
    model: string
}

export const registerNewsHeadlines = Object.freeze({
    mutationKey: `/v1/news/register`,
    mutationFn: async (
        payload: TRegisterNewsTopicsRequest,
    ): Promise<{ chatId: string } & TSystemMessage> => {
        const response = await axiosInstance<
            TRegisterNewsTopicsRequest,
            IApiResponse<TRegisterNewsTopicsResponse>
        >({
            method: 'POST',
            url: `/v1/news/register`,
            headers: { 'Content-Type': 'application/json' },
            data: payload,
        })

        const data = response.data.result

        return {
            chatId: data.id,
            role: 'system',
            content: data.delta.content,
        }
    },
})

export type TGetSuggestedTopicsRequest = {
    topic: string
}

export type TGetSuggestedTopicsResponse = {
    message: {
        _id: string
        chatId: string

        createdAt: string
        updatedAt: string
    } & TSystemMessage
}

export const getSuggestedTopics = Object.freeze({
    mutationKey: `/v1/news/suggest-topics`,
    mutationFn: async (topic: string): Promise<TGetSuggestedTopicsResponse> => {
        const response = await axiosInstance.post<
            TGetSuggestedTopicsRequest,
            IApiResponse<TGetSuggestedTopicsResponse>
        >(`/v1/news/suggest-topics`, { topic })

        return response.data.result
    },
})

interface IGetNewsChatMessagesResponse {
    messages: TMessage[]
    chat: IChat
    nextPageToken: string | null
}

export const getNewsConversations = Object.freeze({
    queryKey: `/v1/news/messages`,
    queryFn: async (chatId: string): Promise<IGetNewsChatMessagesResponse> => {
        const response = await axiosInstance.get<{ result: IGetNewsChatMessagesResponse }>(
            `/v1/news/messages?chatId=${chatId}&type=CONVERSATION`,
        )

        return response.data.result
    },
})

export const getNewsMessages = Object.freeze({
    queryKey: `/v1/news/messages`,
    queryFn: async (
        chatId: string,
        nextPageToken: string | null,
    ): Promise<IGetNewsChatMessagesResponse> => {
        let url = `/v1/news/messages?chatId=${chatId}&type=NEWS`
        if (nextPageToken) {
            url += `&nextPageToken=${nextPageToken}`
        }

        const response = await axiosInstance.get<{ result: IGetNewsChatMessagesResponse }>(url)

        return response.data.result
    },
})

export type TCreateNewsCompletionRequest = {
    chatId?: string
    searchType: 'NEWS'
    message: { role: 'user'; content: string }
}

export const createNewsChatCompletion = Object.freeze({
    mutationKey: `/v1/news/completion`,
    /**
     * Access the response stream by defining `options.onUpdate`
     * @param payload - Message Request
     * @param onUpdate - Callback function to trigger on new streaming result
     * @returns
     */
    mutationFn: async (
        payload: TCreateNewsCompletionRequest,
        signal: AbortSignal,
        onUpdate: (response: IChatCompletionResponse) => void,
    ): Promise<IChatCompletionResponse> => {
        // Axios browser has a quirk in handling streams.
        // It joins all the data back, but we don't want that.
        // So we use buffer const to unwind it.
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: `/v1/news/completion`,
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

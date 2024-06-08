import axiosInstance from '@/utils/axios'
import { TMessage } from '@/queries/messages'
import { IChatCompletionResponse } from './chat'
import { Log } from 'debug-next'
import { formatStreamResponse } from '@/utils/formatStreamResponse'
import { ObjectId } from 'bson'

const { logError } = Log()

export const uploadDocument = Object.freeze({
    mutationKey: '/v1/documents/upload',
    mutationFn: async (
        files: File[],
        fileIds: string[],
        signal: AbortSignal,
        onUpdate: (response: IChatCompletionResponse) => void,
        chatId?: string,
    ): Promise<IChatCompletionResponse> => {
        const formData = new FormData()

        files.forEach(file => {
            formData.append('documents', file)
        })

        if (chatId && chatId.length > 0) {
            formData.append('chatId', chatId)
        }

        fileIds.forEach(fileId => {
            formData.append('fileIds[]', fileId)
        })

        // Axios browser has a quirk in handling streams.
        // It joins all the data back, but we don't want that.
        // So we use buffer const to unwind it.
        let buffer = ''

        const response = await axiosInstance.post<string>('/v1/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            signal,
            onDownloadProgress: progressEvent => {
                if (typeof progressEvent.event.currentTarget.response !== 'string') {
                    logError(`${progressEvent.event.currentTarget.response} is not a string.`)
                    throw new Error('progressEvent response is not a string.')
                }

                // unwind axios joined stream
                const data = progressEvent.event.currentTarget.response.replace(buffer, '')

                // This function will throw an error if it finds an error chunk in the stream.
                const response = formatStreamResponse(data)

                onUpdate(response)

                // add the data back to the buffer
                buffer = `${buffer}${data}`
            },
        })

        return formatStreamResponse(JSON.stringify(response.data))
    },
})

interface IResearchDocumentResponse {
    file: {
        filename: string
        size: number
        mimetype: string

        fileId: string
        createdAt: string
        updatedAt: string
    }
    progress: number
}

export const getResearchDocument = Object.freeze({
    queryKey: `/v1/documents`,
    queryFn: async ({ researchDocumentId }: { researchDocumentId: string }) => {
        const response = await axiosInstance.get<{ result: IResearchDocumentResponse }>(
            `/v1/documents/${researchDocumentId}`,
        )
        return response.data.result
    },
})

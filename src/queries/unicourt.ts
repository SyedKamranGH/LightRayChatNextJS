import { Log } from 'debug-next'

import type { TCaseChoice, TSystemMessage } from '@/queries/messages'
import axiosInstance from '@/utils/axios'
import { formatStreamResponse } from '@/utils/formatStreamResponse'

const { logError } = Log()

export interface IUniCourtCompletionResponse {
    message: TSystemMessage
    id: string
    created: number
    object: 'chat.completion'
    model: string
}

type TCompanyOption = { companyId: string; name: string; description: string }
type TCompanyOptionMetadata = {
    options: TCompanyOption[]
    selectedOptions: TCompanyOption[]
}

type TUniCourtCaseOption = { name: string; caseId: string }
type TUniCourtCaseOptionMetadata = {
    options: TUniCourtCaseOption[]
    selectedOptions: TUniCourtCaseOption[]
}

export type TCreateUniCourtSearchRequest = {
    chatId?: string
    message: {
        role: 'user'
        content: string
        userQuery?: string
        companyName?: string
        countryCode?: string
    } & (
        | { type: 'COMPANY_OPTIONS'; metadata: TCompanyOptionMetadata }
        | { type: 'UNICOURT_CASE_OPTIONS'; metadata: TUniCourtCaseOptionMetadata }
        | {}
    )
}

export const createUniCourtCompletion = Object.freeze({
    mutationKey: '/v1/lightray/unicourt/completion',
    /**
     * Access the response stream by defining `options.onUpdate`
     * @param payload - Message Request
     * @param onUpdate - Callback function to trigger on new streaming result
     * @returns
     */
    mutationFn: async (
        payload: TCreateUniCourtSearchRequest,
        signal: AbortSignal,
        onUpdate?: (response: IUniCourtCompletionResponse) => void,
    ): Promise<IUniCourtCompletionResponse> => {
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: createUniCourtCompletion.mutationKey,
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

                onUpdate && onUpdate(response)

                // add the data back to the buffer
                buffer = `${buffer}${data}`
            },
            signal,
        })

        return formatStreamResponse(
            typeof response.data === 'string' ? response.data : JSON.stringify(response.data),
        )
    },
})

type TSelectUniCourtCasesRequest = {
    selectedCases: TCaseChoice[]
    chatId: string
    messageId: string
}

export const selectCases = Object.freeze({
    mutationKey: '/v1/lightray/unicourt/cases',
    mutationFn: async (payload: TSelectUniCourtCasesRequest) => {
        const { selectedCases, chatId, messageId } = payload
        const response = await axiosInstance.post(selectCases.mutationKey, {
            selectedCases,
            chatId,
            messageId,
        })
        return response.data
    },
})

import { Log } from 'debug-next'

import type { TCompanyChoice, TSystemMessage } from '@/queries/messages'
import axiosInstance from '@/utils/axios'
import { formatStreamResponse } from '@/utils/formatStreamResponse'

const { logError } = Log()

export interface ICreditSafeCompletionResponse {
    message: TSystemMessage
    id: string
    created: number
    object: 'chat.completion'
    model: string
}

type TOption = { companyId: string; name: string; description: string }
type TMetadata = {
    options: TOption[]
    selectedOptions: TOption[]
}

export interface ISuggestedCompaniesResponse {
    chatId: string
    userId: string
    role: 'system'
    type: 'COMPANY_OPTIONS'
    content: string
    metadata: TMetadata
}

export type TCreateCreditSafeSearchRequest = {
    chatId?: string
    message: {
        role: 'user'
        content: string
        userQuery?: string
        companyName?: string
        countryCode?: string
    } & ({ type: 'COMPANY_OPTIONS'; metadata: TMetadata } | {})
}

export const createCreditSafeCompletion = Object.freeze({
    mutationKey: '/v1/lightray/investigate-company/completion',
    /**
     * Access the response stream by defining `options.onUpdate`
     * @param payload - Message Request
     * @param onUpdate - Callback function to trigger on new streaming result
     * @returns
     */
    mutationFn: async (
        payload: TCreateCreditSafeSearchRequest,
        signal: AbortSignal,
        onUpdate?: (response: ICreditSafeCompletionResponse) => void,
    ): Promise<ICreditSafeCompletionResponse> => {
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: createCreditSafeCompletion.mutationKey,
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

export type TRegisterCompanyRequest = {
    chatId: string
    selectedCompany: Pick<TCompanyChoice, 'source' | 'companyId' | 'name'> & {
        address: { postalCode: TCompanyChoice['postalCode'] }
    }
}

export const registerCompany = Object.freeze({
    mutationKey: '/v1/lightray/investigate-company/register-company',
    mutationFn: async (
        payload: TRegisterCompanyRequest,
        signal: AbortSignal,
        // TODO :: once we integrate multiple APIs, we need to update the response
        // typings into more generic one.
        onUpdate?: (response: ICreditSafeCompletionResponse) => void,
    ): Promise<ICreditSafeCompletionResponse> => {
        let buffer = ''

        const response = await axiosInstance<string>({
            method: 'POST',
            url: registerCompany.mutationKey,
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

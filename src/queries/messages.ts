import axiosInstance from '@/utils/axios'

import type { IChat, TCitationRef } from './chat'
import { TNews } from '@/queries/news.types'
import { ObjectId } from 'bson'

export type TDefaultMessage = {
    role: 'user'
    content: string
}

export type TResearchDocument = {
    _id: string
    filename: string
    size: number
    mimetype: string
}

export type TDocumentMessage = {
    role: 'user'
    type: 'DOCUMENT'
    documents: TResearchDocument[]
}

export type TDefaultSystemMessage = {
    role: 'system'
    content: string
    citations?: TCitationRef[]
}

export type TNewsSystemMessage = {
    role: 'system'
    type: 'NEWS'
    content: string
    news: TNews
}

export type TChoicePromptSystemMessage = {
    role: 'system'
    type: 'CHOICE_PROMPT'
    content: string
    metadata: {
        options: string[]
        confirmed: boolean
        selectedOptions: string[]
    }
}

export type TCompanySearchSystemMessage = {
    role: 'system'
    content: string
    companyName?: string
    countryCode?: string
}

export type TCompanyOptionsSystemMessage = {
    role: 'system'
    type: 'COMPANY_OPTIONS'
    content: string
    metadata: {
        options: TCompanyChoice[]
        selectedOptions: TCompanyChoice[]
    }
    userQuery: string
    companyName?: string
    countryCode?: string
}
export type TCompanyChoice = {
    companyId: string
    name: string
    description: string
    // address can be empty string in case of null values from up stream API.
    address: string
    status?: string
    source: 'CREDIT_SAFE' | 'OPEN_CORPORATES'
    branch_status?: string | null

    // For UniCourt
    postalCode: string | undefined
}

export type TCaseChoice = { name: string; caseId: string; caseNumber: string; caseStatus: string }
export type TUniCourtCaseOptionsSystemMessage = {
    _id: string
    role: 'system'
    type: 'UNICOURT_CASE_OPTIONS'
    content: string
    metadata: {
        options: TCaseChoice[]
        selectedOptions: TCaseChoice[]
    }
}

export type TUserMessage = TDocumentMessage | TDefaultMessage
export type TSystemMessage =
    | TDefaultSystemMessage
    | TNewsSystemMessage
    | TChoicePromptSystemMessage
    | TCompanySearchSystemMessage
    | TCompanyOptionsSystemMessage
    | TUniCourtCaseOptionsSystemMessage

export type TMessage = {
    _id: string
    chatId: string

    createdAt: string
    updatedAt: string
} & (TUserMessage | TSystemMessage)

interface IMessagesResponse {
    messages: TMessage[]
    chat: IChat
}

export const getChatMessages = Object.freeze({
    queryKey: `/v1/chat/messages`,
    queryFn: async (chatId: string): Promise<IMessagesResponse> => {
        const response = await axiosInstance.get<{ result: IMessagesResponse }>(
            `/v1/chat/messages?chatId=${chatId}`,
        )
        return response.data.result
    },
})

import type { TMessage, TSystemMessage, TUserMessage } from '@/queries/messages'

import {
    isChoicePromptSystemMessage,
    isDefaultSystemMessage,
    isNewsSystemMessage,
    isSystemMessage,
    SystemMessage,
    ChoicePromptSystemMessage,
    isCompanyOptionsSystemMessage,
    isUniCourtCaseOptionsSystemMessage,
} from './system-message'

import {
    DefaultMessage,
    DocumentMessage,
    isDefaultMessage,
    isDocumentMessage,
} from './user-message'
import { NewsSystemMessage } from '@/components/shared/message-box/system-message/NewsSystemMessage'
import { CompanyOptionsSystemMessage } from './system-message/CompanyOptionsMessage'
import { UniCourtCaseOptionsSystemMessage } from '@/components/shared/message-box/system-message/unicourt/UniCourtCaseOptionsMessage'
import { useRouter } from 'next/router'

// We don't need chatId, createdAt and updatedAt. But we require TUserMessage and TSystemMessage
export type TMessageBox = Partial<TMessage> & (TUserMessage | TSystemMessage)

interface IMessageProps {
    message: TMessageBox
    isLoading?: boolean
    onChoicePrompt?: (selectedOptions: string[]) => void
}

export const Message = ({ message, isLoading = false, onChoicePrompt }: IMessageProps) => {
    const router = useRouter()

    // System message
    if (isSystemMessage(message)) {
        if (isNewsSystemMessage(message)) return <NewsSystemMessage message={message} />

        if (isChoicePromptSystemMessage(message))
            return <ChoicePromptSystemMessage message={message} onSubmit={onChoicePrompt} />

        if (isCompanyOptionsSystemMessage(message))
            return <CompanyOptionsSystemMessage message={message} />

        if (isUniCourtCaseOptionsSystemMessage(message))
            return <UniCourtCaseOptionsSystemMessage message={message} />

        if (isDefaultSystemMessage(message))
            return <SystemMessage message={message} isLoading={isLoading} />
    }

    // Document message
    if (isDocumentMessage(message)) return <DocumentMessage message={message} />

    // default message type
    if (isDefaultMessage(message)) return <DefaultMessage message={message} />

    // No message should reach here.
    // log to sentry
    return null
}

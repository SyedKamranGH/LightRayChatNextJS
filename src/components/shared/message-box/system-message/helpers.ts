import {
    TChoicePromptSystemMessage,
    TCompanyOptionsSystemMessage,
    TDefaultSystemMessage,
    TNewsSystemMessage,
    TSystemMessage,
    TUniCourtCaseOptionsSystemMessage,
} from '@/queries/messages'

export const isSystemMessage = (message: Object): message is TSystemMessage => {
    // 'role' must be 'system'
    if (!('role' in message) || message.role !== 'system') return false

    return true
}

/*
We just need to check if the `content` property is in message.
However, when we orchestrate the components, it is important to check other types first
as other msg types can have the content too.

Example:
 if(isChoicePromptMsg) return <ChoicePromptMsg />
 if(isNewsMsg) return <NewsMsg />
 if(isDefaultMsg) return <DefaultSystemMsg />
*/
export const isDefaultSystemMessage = (
    message: TSystemMessage,
): message is TDefaultSystemMessage => {
    return 'content' in message
}

export const isNewsSystemMessage = (message: TSystemMessage): message is TNewsSystemMessage => {
    return 'type' in message && message.type === 'NEWS'
}

export const isChoicePromptSystemMessage = (
    message: TSystemMessage,
): message is TChoicePromptSystemMessage => {
    return 'type' in message && message.type === 'CHOICE_PROMPT'
}

export const isCompanyOptionsSystemMessage = (
    message: TSystemMessage,
): message is TCompanyOptionsSystemMessage => {
    return 'type' in message && message.type === 'COMPANY_OPTIONS'
}

export const isUniCourtCaseOptionsSystemMessage = (
    message: TSystemMessage,
): message is TUniCourtCaseOptionsSystemMessage => {
    return 'type' in message && message.type === 'UNICOURT_CASE_OPTIONS'
}

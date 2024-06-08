import { TypingIndicator } from '@/components/pages/index/TypingIndicator'
import { ChatContainer } from '@/components/shared'
import type { TDefaultSystemMessage } from '@/queries/messages'

import { MarkdownMessage } from '../MarkdownMessage'
import { AIProfile } from './AIProfile'
import { CitationMessage } from './CitationMessage'
import { CompanyRequestFormMessage } from './CompanyRequestFormMessage'

export const SystemMessage = ({
    message,
}: {
    message: TDefaultSystemMessage
    isLoading: boolean
}) => {
    const { content, citations } = message

    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-2">
                <AIProfile />
                {content.length === 0 ? (
                    <TypingIndicator className="mt-4 justify-start" />
                ) : (
                    <div className="ml-[45px]">
                        <CitationMessage citations={citations} />
                        {content.includes('I am not able to find any companies') ? (
                            <CompanyRequestFormMessage />
                        ) : (
                            <MarkdownMessage content={content} />
                        )}
                    </div>
                )}
            </div>
        </ChatContainer>
    )
}

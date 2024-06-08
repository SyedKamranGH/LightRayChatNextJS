import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { ChatOptionsMenu } from '@/components/shared'
import { InformationContainer } from '@/components/shared/container/information-container'
import { LoadingIcon } from '@/components/shared/icons'
import { getChatHistory } from '@/queries/chat'
import { TChatType } from '@/queries/chat.types'
import { timeAgo } from '@/utils/formatDate'

const LIGHTRAY_TYPES: TChatType[] = ['CREDIT_SAFE_SEARCH', 'UNICOURT_SEARCH']

const getRoute = (chatType: TChatType) => {
    if (chatType === 'CREDIT_SAFE_SEARCH') {
        return '/lightray/'
    }

    if (chatType === 'UNICOURT_SEARCH') {
        return '/court/'
    }

    return '/chat/[chat_id]'
}

export const ChatHistoryRecords = () => {
    // Either pagination or infinite scroll here
    const { data: chats = [], isLoading } = useQuery({
        queryKey: [getChatHistory.queryKey],
        queryFn: () =>
            getChatHistory.queryFn(
                'NORMAL,RESEARCH_FROM_DOCUMENT,SEARCH,CREDIT_SAFE_SEARCH,UNICOURT_SEARCH',
            ),
    })

    // Loading state
    // TODO: This should be handled by suspense component
    if (isLoading) {
        return (
            <section className="flex h-full flex-1 items-center justify-center">
                <LoadingIcon className="m-auto h-20 w-20 text-grey-100" />
            </section>
        )
    }

    // No chat
    if (chats.length === 0) {
        return (
            <InformationContainer
                imgSrc="/image/no-conversation.png"
                title="You haven’t started a chat yet."
                description="Whether you have questions, need information, or simply want to chat, pints.ai is ready to assist you. Feel free to start a conversation with us. We are at your service!"
                buttonText="Start a Chat"
                href="/"
            />
        )
    }

    return (
        <section className="pt-10">
            <div className="mx-[15px] max-w-5xl md:mx-[150px] 2xl:mx-auto">
                <header className="mb-2 flex justify-between">
                    <h2 className="base-medium sm:h4-medium">Recent chats</h2>
                    <Link href="/company-request">Company Request</Link>
                </header>
                <main>
                    <ul className="grid grid-cols-1 divide-y divide-grey-400">
                        {chats.map(chat => {
                            const { chatId, title, lastMessage, updatedAt, chatType } = chat

                            const pathname = getRoute(chatType)

                            return (
                                <li
                                    className="flex w-full flex-col items-start gap-[5px] py-5"
                                    key={chatId}
                                >
                                    <Link
                                        href={{
                                            pathname,
                                            query: LIGHTRAY_TYPES.includes(chatType)
                                                ? { chatId }
                                                : // eslint-disable-next-line camelcase
                                                  { chat_id: chatId },
                                        }}
                                        // as="/chat/[chat_id]"
                                    >
                                        <p className="paragraph-medium line-clamp-1 capitalize">
                                            {title}
                                        </p>
                                        <p className="body-regular line-clamp-3">{lastMessage}</p>
                                    </Link>
                                    <div className="flex-between flex w-full">
                                        <p className="body-regular">{timeAgo(updatedAt)}</p>
                                        <ChatOptionsMenu title={title} chatId={chatId} />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </div>
        </section>
    )
}

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { timeAgo } from '@/utils/formatDate'
import { LoadingIcon } from '@/components/shared/icons'
import { getChatHistory } from '@/queries/chat'
import { LinkButton, ChatOptionsMenu } from '@/components/shared'

const NoChatHistory = () => (
    <div className="flex-center flex-1 flex-col gap-12 px-8 py-10 md:px-32 md:py-24">
        <Image src="/assets/icons/no-chat.svg" height={150} width={150} alt="no chat" />
        <div className="flex flex-col gap-[15px]">
            <span className="base-medium ">You haven’t started a search yet.</span>
            <p className="paragraph-regular">
                Whether you have questions, need information, or simply want to search, LightRay is
                ready to assist you. Feel free to start a conversation with us. We are at your
                service!
            </p>
        </div>
        <LinkButton linkProps={{ href: '/' }}>Start a search</LinkButton>
    </div>
)

export const SearchHistoryRecords = () => {
    // Either pagination or infinite scroll here
    const { data: chats = [], isLoading } = useQuery({
        queryKey: [getChatHistory.queryKey],
        queryFn: () => getChatHistory.queryFn('SEARCH'),
    })

    if (isLoading) return <LoadingIcon />

    if (!chats || chats.length < 1) return <NoChatHistory />

    return (
        <div className="flex flex-1 flex-col items-start pt-8">
            <h4 className="base-medium">Recent searches</h4>
            <ul className="grid w-full cursor-pointer grid-cols-1 divide-y divide-grey-400">
                {chats.map(chat => {
                    const { chatId, title, lastMessage, updatedAt } = chat

                    return (
                        <li
                            className="flex w-full flex-col items-start gap-[5px] py-5"
                            key={chatId}
                        >
                            <Link
                                // eslint-disable-next-line camelcase
                                href={{
                                    pathname: '/chat/[chat_id]',
                                    // eslint-disable-next-line camelcase
                                    query: { chat_id: chatId },
                                }}
                                as="/chat/[chat_id]"
                            >
                                <p className="paragraph-medium">{title}</p>
                                <p className="body-regular">{lastMessage.slice(0, 500)}</p>
                            </Link>
                            <div className="flex-between flex w-full">
                                <p className="body-regular">{timeAgo(updatedAt)}</p>
                                <ChatOptionsMenu title={title} chatId={chatId} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BsClock } from 'react-icons/bs'
import { timeAgo } from '@/utils/formatDate'
import { LoadingIcon } from '@/components/shared/icons'
import { getChatHistory } from '@/queries/chat'
import { ChatOptionsMenu } from '@/components/shared'
import { InformationContainer } from '@/components/shared/container/information-container'

export const NewsListenerRecords = () => {
    // Either pagination or infinite scroll here
    const { data: chats = [], isLoading } = useQuery({
        queryKey: [getChatHistory.queryKey],
        queryFn: () => getChatHistory.queryFn('NEWS_LISTENER'),
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
                imgSrc="/image/no-email.png"
                title="You haven’t subscribed to any topic yet."
                description="Start your journey by exploring trending topics and subscribe to the ones that interest you the most. Your history will fill up with updates as you subscribed. Stay informed, stay engaged!"
                buttonText="Start Exploring News"
                href="/news-listener/listen"
            />
        )
    }

    return (
        <section className="pt-10">
            <div className="mx-[15px] max-w-5xl md:mx-[150px] 2xl:mx-auto">
                <header className="mb-2 flex justify-between">
                    <h2 className="base-medium sm:h4-medium">Recent news</h2>
                </header>
                <main>
                    <ul className="grid grid-cols-1 divide-y divide-grey-400">
                        {chats.map(chat => {
                            const { chatId, title, lastMessage, updatedAt } = chat

                            return (
                                <li key={chatId} className="py-5">
                                    <Link
                                        // eslint-disable-next-line camelcase
                                        href={{
                                            pathname: '/news-listener/[chat_id]',
                                            // eslint-disable-next-line camelcase
                                            query: { chat_id: chatId },
                                        }}
                                        as="/news-listener/[chat_id]"
                                    >
                                        <h3 className="line-clamp-1 text-base font-semibold">
                                            {title}
                                        </h3>
                                        <p className="line-clamp-2 py-[5px] text-[14px] leading-[25px]">
                                            {lastMessage}
                                        </p>
                                    </Link>
                                    <div className="flex-between flex">
                                        <p className="body-regular flex items-center gap-1 text-grey-100">
                                            <BsClock />
                                            Updated {timeAgo(updatedAt)}
                                        </p>
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

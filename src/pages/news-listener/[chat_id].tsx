import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ChatHeadingWithTabs } from '@/components/pages/chat/ChatHeadingWithTabs'
import { TypingIndicator } from '@/components/pages/index/TypingIndicator'
import { ChatContainer, InputBar, Layout, Message, type TMessageBox } from '@/components/shared'
import { AIProfile } from '@/components/shared/message-box/system-message/AIProfile'
import { useSendMessage } from '@/hooks/useSendMessage'
import { getNewsConversations, getNewsMessages } from '@/queries/news-listener'

const NewsSection = (props: { chatId: string; headlines: string[] }) => {
    const { chatId, headlines } = props

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [getNewsMessages.queryKey, chatId, 'news'],
        queryFn: ({ pageParam = null }) => getNewsMessages.queryFn(chatId, pageParam),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        refetchInterval: 1000 * 60 * 3, // every 3 minutes
        getNextPageParam: lastPage => lastPage.nextPageToken,
    })

    const hasMessages = data?.pages && data.pages[0].messages.length > 0
    const hasHeadlines = Boolean(headlines && headlines.length > 0)

    return (
        <div className="flex flex-1 flex-col items-start" id="news">
            {hasHeadlines && (
                <ChatContainer>
                    <div className="flex flex-1 flex-col justify-start gap-6">
                        <AIProfile />
                        <p>You are subscribed to the headlines:</p>
                        <div className="flex flex-col gap-4 rounded-sm bg-gray-200 px-4 py-2">
                            {headlines.map((headline, index) => (
                                <div key={index} className="flex gap-2">
                                    <Image
                                        src="/assets/icons/flash.svg"
                                        width={18}
                                        height={18}
                                        alt=""
                                    />
                                    <p>{headline}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChatContainer>
            )}

            {hasMessages ? (
                <>
                    {data.pages
                        .map(page => page.messages)
                        .flat()
                        .map((message, index) => (
                            <Message message={message} key={index} />
                        ))}

                    {hasNextPage ? (
                        <ChatContainer>
                            {isFetchingNextPage ? (
                                <TypingIndicator />
                            ) : (
                                <p className="underline" onClick={() => fetchNextPage()}>
                                    Load 5 More News
                                </p>
                            )}
                        </ChatContainer>
                    ) : null}
                </>
            ) : (
                <ChatContainer>
                    <div className="flex w-full flex-col items-center">
                        <Image
                            src="/image/empty-news.png"
                            width={200}
                            height={150}
                            alt="Empty News"
                            className="mb-4 self-center"
                        />
                        <p className="max-w-xl text-center text-[16px]">
                            There is no news yet. We will send you the updates as soon as they come
                            in.
                        </p>
                    </div>
                </ChatContainer>
            )}
        </div>
    )
}

export default function Chat() {
    const router = useRouter()
    const chatId = router.query.chat_id as string

    const [newChat, setNewChat] = useState<TMessageBox[]>([])

    // In NextJS dynamic route, the useState is shared between all pages.
    // To avoid all the pages sharing the latest chat conversation
    // We need to reset whenever the url path changes.
    useEffect(() => {
        setNewChat([])
    }, [chatId])

    const { data, isError, error } = useQuery({
        queryKey: [getNewsConversations.queryKey, chatId, 'chat'],
        queryFn: () => getNewsConversations.queryFn(chatId as string),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        refetchInterval: 1000 * 60 * 3, // every 3 minutes
    })

    const { messages: prevChat = [], chat } = data ?? {}
    const { title = '', headlines = [] } = chat ?? {}

    useEffect(() => {
        if (!isError) {
            return
        }

        if (error instanceof AxiosError && error.response?.status === 400) {
            toast.error('This search is not available. Please try another search.')
            setTimeout(() => router.push('/'), 3000)
            return
        }

        toast.error(
            'Something went wrong while getting the search messages. Please refresh the page.',
            { autoClose: 5000 },
        )
    }, [error, isError, router])

    const sendMessage = useSendMessage(setNewChat)

    return (
        <Layout>
            <div className="relative flex h-full w-full flex-col overflow-hidden sm:pt-12">
                <ChatHeadingWithTabs
                    chatId={chatId}
                    title={title}
                    linkTabs={[
                        { title: 'News', href: '#news' },
                        { title: 'Search with LightRay', href: '#conversation' },
                    ]}
                />

                <div className="flex flex-1 flex-col overflow-y-auto scroll-smooth">
                    <NewsSection chatId={chatId} headlines={headlines} />

                    <div className="mb-20 flex flex-col items-start divide-y" id="conversation">
                        {prevChat.length > 0 &&
                            prevChat.map((message, index) => (
                                <Message message={message} key={index} />
                            ))}
                        {newChat.length > 0 &&
                            newChat.map((message, index) => (
                                <Message
                                    message={message}
                                    key={index}
                                    isLoading={sendMessage.isLoading}
                                />
                            ))}
                        <div className="h-32 flex-shrink-0"></div>
                    </div>

                    <InputBar
                        sendMessage={sendMessage.mutate}
                        chatType="NEWS_LISTENER"
                        chatId={chatId}
                    />
                </div>
            </div>
        </Layout>
    )
}

// Adding function to retain the query inside router on refresh
// https://stackoverflow.com/questions/65859612/id-is-gone-when-i-refresh-a-nextjs-dynamic-route-page
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {},
    }
}

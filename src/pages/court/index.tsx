import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

import { MessageList } from '@/components/pages/MessageList'
import { ChatHeading } from '@/components/pages/chat'
import { LandingPage } from '@/components/pages/index'
import { InputBar, Layout } from '@/components/shared'
import { ChatProvider, useChatContext } from '@/hooks/chat.context'
import { useScrollToLastItem } from '@/hooks/useScrollToLastItem'
import { getChatMessages } from '@/queries/messages'
import { TCreateUniCourtSearchRequest, createUniCourtCompletion } from '@/queries/unicourt'

const Chat = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const chatId = searchParams?.get('chatId')

    const { newChat, setNewChat, updateLastMessage, removeLastMessageOnError } = useChatContext()

    const { data, isError, error } = useQuery({
        queryKey: [getChatMessages.queryKey, chatId],
        queryFn: () => getChatMessages.queryFn(chatId as string),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: typeof chatId === 'string',
        retry: 1,
        refetchInterval: 1000 * 60 * 3, // every 3 minutes
    })

    const { messages: prevChat = [], chat } = data ?? {}
    const { title = 'New Search' } = chat || {}

    useEffect(() => {
        if (prevChat.length > 0) {
            setNewChat(prevChat)
        }
    }, [prevChat, setNewChat])

    useEffect(() => {
        if (!chatId) {
            setNewChat([])
        }
    }, [chatId, setNewChat])

    const messageListRef = useRef<HTMLDivElement>(null)
    const { scrollToLastItem } = useScrollToLastItem(messageListRef)
    // Scroll to the last item as new messages come in.
    useEffect(() => {
        scrollToLastItem()
    }, [prevChat, newChat, scrollToLastItem])

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

    const abortControllerRef = useRef(new AbortController())

    const { mutate, isLoading } = useMutation({
        mutationKey: [createUniCourtCompletion.mutationKey],
        mutationFn: ({ message: msgInput }: { message: string }) => {
            setNewChat(prev => [
                ...prev,
                { role: 'user', content: msgInput },
                { role: 'system', content: '' },
            ])

            const payload: TCreateUniCourtSearchRequest = {
                chatId: chatId ?? undefined,
                message: { role: 'user', content: msgInput },
            }

            const lastMessage = newChat.at(-1)
            if (lastMessage) {
                if ('userQuery' in lastMessage && lastMessage.userQuery) {
                    payload.message.userQuery = lastMessage.userQuery
                }

                if ('companyName' in lastMessage && lastMessage.companyName) {
                    payload.message.companyName = lastMessage.companyName
                }

                if ('countryCode' in lastMessage && lastMessage.countryCode) {
                    payload.message.countryCode = lastMessage.countryCode
                }
            }

            return createUniCourtCompletion.mutationFn(
                payload,
                abortControllerRef.current.signal,
                response => {
                    updateLastMessage(response.message)
                },
            )
        },
        onSuccess: data => {
            if (!chatId) {
                router.push(`/court/?chatId=${data.id}`, undefined, { shallow: true })
            }
        },
        onError: () => {
            removeLastMessageOnError()
            toast.error('Something went wrong while getting the response. Please try again.')
        },
    })

    return (
        <Layout>
            <div className="flex h-full w-full overflow-hidden">
                {newChat.length > 0 || chatId ? (
                    <div className="relative flex h-full w-full flex-col overflow-hidden sm:py-12">
                        <ChatHeading
                            title={title}
                            chatId={chatId ?? ''}
                            chatType={chat?.chatType}
                        />
                        <MessageList newChat={newChat} isLoading={isLoading} />
                        <InputBar
                            sendMessage={mutate}
                            chatId={chatId as string}
                            isLoading={isLoading}
                            enableUpload={false}
                        />
                    </div>
                ) : (
                    <LandingPage
                        sendMessage={mutate}
                        sendFile={() => null}
                        isLoading={isLoading}
                        searchType="UNICOURT"
                    />
                )}
            </div>
        </Layout>
    )
}

export default function ChatWithContext() {
    return (
        <ChatProvider>
            <Chat />
        </ChatProvider>
    )
}

// Adding function to retain the query inside router on refresh
// https://stackoverflow.com/questions/65859612/id-is-gone-when-i-refresh-a-nextjs-dynamic-route-page
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {},
    }
}

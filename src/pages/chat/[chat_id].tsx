import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { twJoin } from 'tailwind-merge'

import { MessageList } from '@/components/pages/MessageList'
import { ChatHeading } from '@/components/pages/chat'
import { ChatDocuments } from '@/components/pages/chat/ChatDocuments'
import { InputBar, Layout, type TMessageBox } from '@/components/shared'
import { useScrollToLastItem } from '@/hooks/useScrollToLastItem'
import { useSendFile } from '@/hooks/useSendFile'
import { useSendMessage } from '@/hooks/useSendMessage'
import { getChatMessages } from '@/queries/messages'

export default function Chat() {
    const router = useRouter()
    const chatId = router.query.chat_id as string

    const [newChat, setNewChat] = useState<TMessageBox[]>([])
    const [openDocumentsPanel, setOpenDocumentsPanel] = useState(false)

    // In NextJS dynamic route, the useState is shared between all pages.
    // To avoid all the pages sharing the latest chat conversation
    // We need to reset whenever the url path changes.
    useEffect(() => {
        setNewChat([])
    }, [chatId])

    const { data, isError, error } = useQuery({
        queryKey: [getChatMessages.queryKey, chatId],
        queryFn: () => getChatMessages.queryFn(chatId as string),
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        refetchInterval: 1000 * 60 * 3, // every 3 minutes
    })

    const { messages: prevChat = [], chat } = data ?? {}
    const { title = '' } = chat || {}

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

    const sendFile = useSendFile(setNewChat)
    const sendMessage = useSendMessage(setNewChat)

    const isLoading = sendMessage.isLoading || sendFile.isLoading

    useEffect(() => {
        return () => {
            if (sendFile.reset) sendFile.reset()
            if (sendMessage.reset) sendMessage.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <div className="flex h-full w-full overflow-hidden">
                <div className="relative flex h-full w-full flex-col overflow-hidden">
                    <ChatHeading title={title} chatId={chatId} chatType={chat?.chatType} />
                    <MessageList newChat={newChat} prevChat={prevChat} isLoading={isLoading} />
                    <InputBar
                        sendMessage={sendMessage.mutate}
                        chatId={chatId as string}
                        isLoading={isLoading}
                        enableUpload={chat?.chatType === 'RESEARCH_FROM_DOCUMENT'}
                        sendFile={sendFile.mutate}
                    />
                </div>

                {/* Side Panel for Desktop */}
                {chat?.chatType === 'RESEARCH_FROM_DOCUMENT' ? (
                    <div className="relative flex h-full w-fit border-l border-grey-300 max-lg:hidden">
                        <div className="mt-16 px-4">
                            <button
                                onClick={() => setOpenDocumentsPanel(open => !open)}
                                className="rounded-[5px] border border-grey-300 bg-gray-100 p-1 transition"
                            >
                                <AiOutlineFolderOpen />
                            </button>
                        </div>

                        <div
                            className={twJoin(
                                'linear h-full transition-transform duration-200',
                                openDocumentsPanel ? 'translate-x-0' : 'translate-x-full',
                            )}
                        >
                            {openDocumentsPanel ? <ChatDocuments chatId={chatId} /> : null}
                        </div>
                    </div>
                ) : null}
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

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

import { ChatIcon } from '@/components/shared/icons'
import { useScreenSize } from '@/hooks/useScreenSize'
import { getChatHistory } from '@/queries/chat'
import { SidebarContext } from '../..'

export const ChatHistory = () => {
    const router = useRouter()
    const { chat_id: chatId } = router.query

    const { isMobile } = useScreenSize()
    const { setShowSidebar } = useContext(SidebarContext)

    const { data: chats = [], isError } = useQuery({
        // @ts-ignore
        queryKey: [getChatHistory.queryKey],
        queryFn: getChatHistory.queryFn,
    })

    useEffect(() => {
        if (isError) {
            toast.error(
                'Something went wrong while fetching the search history. Please refresh the page.',
                { autoClose: 5000 },
            )
        }
    }, [isError])

    return (
        <div className="h-fit overflow-y-auto">
            {/* TODO : the two divs allow for sticky header. */}
            {/* In the future if we want to have sticky header, refactor */}
            {/* <div className="relative">
            <div className='sticky top-0 z-[16]'> */}
            <h3 className="h-9 overflow-hidden text-ellipsis break-all px-4 pt-3 text-xs text-gray-500">
                Recent chats
            </h3>
            <ol className="mx-2 flex max-h-full flex-col">
                {
                    // @ts-ignore
                    [...chats].reverse().map(({ _id, title }) => (
                        <li key={_id}>
                            <Link
                                // eslint-disable-next-line camelcase
                                href={{ pathname: '/chat/[chat_id]', query: { chat_id: _id } }}
                                as="/chat/[chat_id]"
                                className={twMerge(
                                    'duration-800 flex h-11 w-full items-center space-x-2 rounded-lg px-2 py-2 transition-colors ease-in-out hover:bg-secondary/20',
                                    chatId === _id && 'bg-secondary/20',
                                )}
                                onClick={() => {
                                    if (isMobile) {
                                        setShowSidebar(false)
                                    }
                                }}
                            >
                                <div className="flex w-full items-center gap-x-[10px] whitespace-nowrap">
                                    <ChatIcon className="flex-shrink-0 fill-gray-500 text-2xl" />
                                    <p className="flex-1 truncate text-left text-sm text-primary ">
                                        {title.replaceAll('"', '')}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}

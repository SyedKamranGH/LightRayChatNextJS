import { useEffect, useRef } from 'react'

import { useScrollToLastItem } from '@/hooks/useScrollToLastItem'
import { Message, TMessageBox } from '../shared'

export const MessageList = (props: {
    newChat: TMessageBox[]
    prevChat?: TMessageBox[]
    isLoading: boolean
}) => {
    const { newChat, prevChat = [], isLoading } = props

    const ref = useRef<HTMLDivElement>(null)
    const { scrollToLastItem } = useScrollToLastItem(ref)
    useEffect(() => {
        const lastMessage = newChat.at(-1)

        if (lastMessage && lastMessage.role === 'user') {
            scrollToLastItem()
        }

        if (lastMessage && lastMessage.role === 'system' && lastMessage.content === '') {
            scrollToLastItem()
        }
    }, [newChat, scrollToLastItem])

    return (
        <div className="flex h-full w-full flex-1 flex-col items-start overflow-y-auto" ref={ref}>
            {prevChat.length > 0 &&
                prevChat.map((message, index) => <Message message={message} key={index} />)}
            {newChat.length > 0 &&
                newChat.map((message, index) => (
                    <Message
                        message={message}
                        key={index}
                        isLoading={index === newChat.length - 1 && isLoading}
                    />
                ))}
        </div>
    )
}

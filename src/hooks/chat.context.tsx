import { Log } from 'debug-next'
import { ReactNode, createContext, useContext, useState } from 'react'
import { Snag } from 'snag'

import { TMessageBox } from '@/components/shared'
import { TSystemMessage } from '@/queries/messages'
import { hasDelimiter } from '@/utils/delimiter'
import { handleMessageChunk } from './useSendMessage'

const { logError } = Log()

export interface IChatContextProps {
    newChat: TMessageBox[]
    setNewChat: React.Dispatch<React.SetStateAction<TMessageBox[]>>
    updateLastMessage: (message: TSystemMessage) => void
    removeLastMessageOnError: () => void
}

const ChatContext = createContext<IChatContextProps | undefined>(undefined)

export const ChatProvider = (props: { children: ReactNode }) => {
    const { children } = props
    const [newChat, setNewChat] = useState<TMessageBox[]>([])

    const updateLastMessage = (message: TSystemMessage) => {
        if ('citations' in message) {
            // check if the previous chat is a system message, and merge them together
            return setNewChat(prev => {
                const lastMessage = prev.pop()
                if (!lastMessage || lastMessage.role !== 'system') {
                    logError('Received citations but there is no system message.', {
                        lastMessage,
                        message,
                    })
                    return prev
                }
                return [...prev, Object.assign(lastMessage, { citations: message.citations })]
            })
        }

        if ('type' in message && message.type === 'COMPANY_OPTIONS') {
            return setNewChat(prev => {
                const lastMessage = prev.pop()
                if (!lastMessage || lastMessage.role !== 'system') {
                    logError('Received citations but there is no system message.', {
                        lastMessage,
                        message,
                    })
                    return prev
                }
                return [...prev, Object.assign(lastMessage, message)]
            })
        }

        if (!('content' in message)) {
            logError('Expected content in system message, but instead got unknown.', {
                message,
            })
            return
        }

        if (hasDelimiter(message.content, '||NEW_MESSAGE_BUBBLE||')) {
            const { chunks, isNewMessage } = handleMessageChunk(message.content)

            return setNewChat(prev => {
                const previousMessage = prev.at(-1)
                const isPrevMessageEmpty =
                    previousMessage?.role === 'system' && previousMessage.content === ''

                if (isNewMessage && !isPrevMessageEmpty) {
                    const newSystemMessages: TSystemMessage[] = chunks.map(chunk => ({
                        ...message,
                        role: 'system',
                        content: chunk,
                    }))
                    return prev.concat(newSystemMessages)
                }

                const lastMessage = prev.pop()
                if (!lastMessage || lastMessage.role !== 'system') {
                    logError('Expected unfinished response but instead got none', {
                        lastMessage,
                        message,
                    })
                    return prev
                }

                const firstMessage = chunks.shift()
                const content = lastMessage.content + firstMessage
                Object.assign(lastMessage, message)
                lastMessage.content = content
                const newSystemMessages: TSystemMessage[] = chunks.map(chunk => ({
                    ...message,
                    role: 'system',
                    content: chunk,
                }))

                return [...prev, lastMessage, ...newSystemMessages]
            })
        }

        return setNewChat(prev => {
            const cloned = [...prev]
            const lastMessage = cloned.pop()

            if (!lastMessage || lastMessage.role !== 'system') {
                logError('Expected unfinished response but instead got none', {
                    lastMessage,
                    message,
                })
                return prev
            }

            const content = lastMessage.content + message.content
            Object.assign(lastMessage, message)
            lastMessage.content = content

            return [...cloned, lastMessage]
        })
    }

    const removeLastMessageOnError = () => {
        setNewChat(prev => {
            const lastMessage = prev.pop()

            if (!lastMessage || (lastMessage.role === 'system' && lastMessage.content === '')) {
                return prev
            }

            return [...prev, lastMessage]
        })
    }

    const ctx: IChatContextProps = {
        newChat,
        setNewChat,
        updateLastMessage,
        removeLastMessageOnError,
    }

    return <ChatContext.Provider value={ctx}>{children}</ChatContext.Provider>
}

export const useChatContext = () => {
    const context = useContext(ChatContext)

    if (!context) {
        throw new Snag('useMessageBox must be used within a MessageBoxProvider')
    }

    return context
}

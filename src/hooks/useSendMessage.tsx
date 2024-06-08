import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Log } from 'debug-next'
import { useRouter } from 'next/router'
import { useCallback, useRef, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'react-toastify'

import type { TMessageBox } from '@/components/shared'
import { createChatCompletion, type TCreateCompletionRequest } from '@/queries/chat'
import { TChatType } from '@/queries/chat.types'
import type { TDefaultMessage, TSystemMessage } from '@/queries/messages'
import { createSearchCompletion, type TCreateSearchRequest } from '@/queries/search'
import { hasDelimiter, splitByDelimiter } from '@/utils/delimiter'
import { createNewsChatCompletion, TCreateNewsCompletionRequest } from '@/queries/news-listener'
import { createCreditSafeCompletion, TCreateCreditSafeSearchRequest } from '@/queries/credit-safe'
import { createUniCourtCompletion } from '@/queries/unicourt'

const { logError } = Log()

export const handleMessageChunk = (rawMessage: string) => {
    const firstNewMessageBubbleIndex = rawMessage.indexOf('||NEW_MESSAGE_BUBBLE||')

    const chunks = splitByDelimiter(rawMessage, '||NEW_MESSAGE_BUBBLE||')

    return { chunks, isNewMessage: firstNewMessageBubbleIndex === 0 }
}

export const useSendMessage = (setNewChat: Dispatch<SetStateAction<TMessageBox[]>>) => {
    const router = useRouter()
    const abortControllerRef = useRef(new AbortController())

    // This function serves to format the incoming system response.
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
                lastMessage.content += firstMessage
                const newSystemMessages: TSystemMessage[] = chunks.map(chunk => ({
                    role: 'system',
                    content: chunk,
                }))

                return [...prev, lastMessage, ...newSystemMessages]
            })
        }

        return setNewChat(prev => {
            const lastMessage = prev.pop()
            if (!lastMessage || lastMessage.role !== 'system') {
                logError('Expected unfinished response but instead got none', {
                    lastMessage,
                    message,
                })
                return prev
            }

            lastMessage.content += message.content

            return [...prev, lastMessage]
        })
    }

    const mutation = useMutation({
        mutationKey: [createChatCompletion.mutationKey, createSearchCompletion.mutationKey],
        mutationFn: ({
            message,
            chatId,
            chatType,
        }: {
            message: string
            chatId?: string
            chatType?: TChatType
            isGoogleSearch?: boolean
        }) => {
            // Set user question
            const newMessage: TDefaultMessage = {
                role: 'user',
                content: message,
            }

            // Show empty system message box
            const emptySystemMessage: TSystemMessage = {
                role: 'system',
                content: '',
            }
            setNewChat(prev => [...prev, newMessage, emptySystemMessage])

            if (chatType === 'UNICOURT_SEARCH') {
                const payload: TCreateCreditSafeSearchRequest = {
                    message: { role: 'user', content: message },
                    ...(chatId && { chatId }),
                }

                return createUniCourtCompletion.mutationFn(
                    payload,
                    abortControllerRef.current.signal,
                    response => {
                        updateLastMessage(response.message)
                    },
                )
            }

            if (chatType === 'CREDIT_SAFE_SEARCH') {
                const payload: TCreateCreditSafeSearchRequest = {
                    message: { role: 'user', content: message },
                    ...(chatId && { chatId }),
                }

                return createCreditSafeCompletion.mutationFn(
                    payload,
                    abortControllerRef.current.signal,
                    response => {
                        updateLastMessage(response.message)
                    },
                )
            }

            if (chatType === 'SEARCH') {
                const payload: TCreateSearchRequest = {
                    message: { role: 'user', content: message },
                    searchType: 'GOOGLE_SEARCH',
                    ...(chatId && { chatId }),
                }
                return createSearchCompletion.mutationFn(
                    payload,
                    abortControllerRef.current.signal,
                    response => {
                        updateLastMessage(response.message)
                    },
                )
            }

            if (chatType === 'NEWS_LISTENER') {
                const payload: TCreateNewsCompletionRequest = {
                    message: { role: 'user', content: message },
                    searchType: 'NEWS',
                    chatId,
                }

                return createNewsChatCompletion.mutationFn(
                    payload,
                    abortControllerRef.current.signal,
                    response => updateLastMessage(response.message),
                )
            }

            const payload: TCreateCompletionRequest = {
                message: { role: 'user', content: message },
                ...(chatId && { chatId }),
            }

            return createChatCompletion.mutationFn(
                payload,
                abortControllerRef.current.signal,
                response => {
                    updateLastMessage(response.message)
                },
            )
        },
        onError: (error, variables, context) => {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'ERR_CANCELED'
            ) {
                // user cancelled the stream. Ignoring
                return
            }

            logError('Failed to send message', { error, variables, context })

            // TODO: Add a retry mechanism
            const errorMessage =
                error instanceof AxiosError &&
                error.response?.data.showMessageToClient &&
                typeof error.response?.data.message === 'string'
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.'

            toast.error(errorMessage, {
                autoClose: 5000,
            })
        },
        onSuccess: data => {
            // Redirect user to "/chat/$chatId" if they are at home page
            if (router.pathname === '/credit-safe') {
                router.push(`/chat/${data.id}`, undefined, { shallow: true })
            }
            if (router.pathname === '/') {
                router.replace(`/chat/${data.id}`, undefined, { shallow: true })
            }
            if (router.pathname === '/news-listener/listen') {
                router.replace(`/news-listener/${data.id}`, undefined, { shallow: true })
            }
        },
    })

    const reset = useCallback(() => {
        abortControllerRef.current.abort()
        mutation.reset()
    }, [mutation])

    return { ...mutation, reset }
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, type Dispatch, type SetStateAction, useCallback } from 'react'
import { toast } from 'react-toastify'
import { ObjectId } from 'bson'

import type { TMessageBox } from '@/components/shared'
import { uploadDocument } from '@/queries/documents'
import type { TDocumentMessage, TSystemMessage } from '@/queries/messages'
import { useRouter } from 'next/router'
import { Log } from 'debug-next'
import { getUploadedDocumentsInChat } from '@/queries/chat'

const { logError } = Log()

export const useSendFile = (setNewChat: Dispatch<SetStateAction<TMessageBox[]>>) => {
    const router = useRouter()
    const abortControllerRef = useRef(new AbortController())
    const queryClient = useQueryClient()

    // This function serves to format the incoming system response.
    const updateLastMessage = (message: TSystemMessage) => {
        if (!('content' in message)) {
            logError('Expected content in system message, but instead got unknown.', {
                message,
            })
            return
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
        mutationKey: [uploadDocument.mutationKey],
        mutationFn: async ({ files, chatId }: { files: File[]; chatId?: string }) => {
            const fileIds = Array(files.length)
                .fill(null)
                .map(() => new ObjectId().toString())

            const documents = files.map((file, index) => ({
                _id: fileIds[index],
                filename: file.name,
                size: file.size,
                mimetype: file.type,
            }))

            const newMessage: TDocumentMessage = {
                role: 'user',
                type: 'DOCUMENT',
                documents,
            }

            // Show empty system message box
            const emptySystemMessage: TSystemMessage = {
                role: 'system',
                content: '',
            }
            setNewChat(prev => [...prev, newMessage, emptySystemMessage])

            return uploadDocument.mutationFn(
                files,
                fileIds,
                abortControllerRef.current.signal,
                response => {
                    updateLastMessage(response.message)
                },
                chatId,
            )
        },
        onError: error => {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'ERR_CANCELED'
            ) {
                // user cancelled the stream. Ignoring
                return
            }

            if (
                typeof error === 'object' &&
                error !== null &&
                'message' in error &&
                typeof error.message === 'string'
            ) {
                toast.error(error.message, {
                    autoClose: 5000,
                })
            } else {
                toast.error('Something went wrong while uploading the file. Please try again.', {
                    autoClose: 5000,
                })
            }

            // TODO: Add a retry button
            // This may require a refactor to handle the error at the message level.
            setNewChat(prev => prev.slice(0, -1))
        },
        onSuccess: data => {
            // Redirect user to "/chat/$chatId" if they are at home page
            if (router.pathname === '/') {
                router.replace(`/chat/${data.id}`)
            }
            return queryClient.invalidateQueries([getUploadedDocumentsInChat.queryKey, data.id])
        },
    })

    const reset = useCallback(() => {
        abortControllerRef.current.abort()
        mutation.reset()
    }, [mutation])

    return { ...mutation, reset }
}

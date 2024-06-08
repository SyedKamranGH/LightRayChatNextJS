import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BsTrash3 } from 'react-icons/bs'

import { removeChat } from '@/queries/chat'
import { Modal } from '../../modals/Modal'

import { Button, ButtonWithLoader } from '../..'
import { ChatActionItem } from '../ChatActionItem'

type TProps = {
    show: boolean
    onClose: () => void
}

const DeleteConfirmationModal = (props: TProps) => {
    const { show, onClose } = props

    const router = useRouter()
    const queryClient = useQueryClient()

    const { chat_id: chatId } = router.query

    const { isLoading: isDeleting, mutate } = useMutation({
        mutationKey: [removeChat.mutationKey, chatId],
        mutationFn: removeChat.mutationFn,
        onSuccess: () => {
            // close the modal
            onClose()

            // invalidate the query
            queryClient.invalidateQueries([removeChat.mutationKey, chatId])

            // navigate to new chat
            router.replace('/')
        },
    })

    if (typeof chatId !== 'string') {
        router.replace('/')
        return
    }

    return (
        <Modal
            showModal={show}
            className="flex w-fit flex-col justify-between gap-y-3"
            onClose={onClose}
        >
            <h1 className="text-xl font-bold text-[#2D2D2D]">Delete Conversation</h1>

            <div>
                <p>Are you sure you want to delete this conversation?</p>
                <p className="text-gray-400">Any files you have uploaded will be deleted.</p>
            </div>

            <div className="mt-4 flex items-center justify-end gap-x-2">
                <Button variant="passivePrimary" onClick={onClose}>
                    Cancel
                </Button>
                <ButtonWithLoader
                    variant="danger"
                    onClick={() => mutate({ chatId })}
                    isLoading={isDeleting}
                >
                    Delete
                </ButtonWithLoader>
            </div>
        </Modal>
    )
}

export const DeleteChat = () => {
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

    return (
        <>
            <ChatActionItem onClick={() => setShowDeleteConfirmationModal(true)}>
                <BsTrash3 className="h-5 w-5" />
                Delete Search
            </ChatActionItem>

            <DeleteConfirmationModal
                show={showDeleteConfirmationModal}
                onClose={() => setShowDeleteConfirmationModal(false)}
            />
        </>
    )
}

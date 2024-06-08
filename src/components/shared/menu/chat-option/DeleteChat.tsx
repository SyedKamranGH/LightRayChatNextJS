import { useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Modal } from '@/components/shared/modals/Modal'
import { Button, ButtonWithLoader } from '@/components/shared'
import { getChatHistory, removeChat } from '@/queries/chat'

type TProps = {
    chatId: string
}

export const DeleteChat = ({ chatId }: TProps) => {
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: [removeChat.mutationKey, chatId],
        mutationFn: removeChat.mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries([getChatHistory.queryKey])
            closeModal()
        },
    })

    return (
        <>
            <li
                className="body-regular flex w-full cursor-pointer gap-[15px]"
                onClick={() => setShowModal(true)}
            >
                <BsTrash3 className="h-5 w-5" />
                Delete Search
            </li>
            <Modal showModal={showModal} onClose={closeModal} className="flex flex-col gap-y-6">
                <h1 className="text-xl font-bold text-[#2D2D2D]">Delete Conversation</h1>

                <div>
                    <p>Are you sure you want to delete this conversation?</p>
                    <p className="text-gray-400">Any files you have uploaded will be deleted.</p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-2">
                    <Button variant="passivePrimary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <ButtonWithLoader
                        variant="danger"
                        onClick={() => mutation.mutate({ chatId })}
                        isLoading={mutation.isLoading}
                    >
                        Delete
                    </ButtonWithLoader>
                </div>
            </Modal>
        </>
    )
}

import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Modal } from '@/components/shared/modals/Modal'
import { Button, ButtonWithLoader } from '@/components/shared'
import { getChatHistory, renameChatTitle } from '@/queries/chat'
import { getChatMessages } from '@/queries/messages'

type TRenameChatTitleModalProps = {
    showModal: boolean
    closeModal: () => void
    originalTitle: string
    chatId: string
}

const RenameChatTitleModal = ({
    showModal,
    closeModal,
    originalTitle,
    chatId,
}: TRenameChatTitleModalProps) => {
    const [input, setInput] = useState(originalTitle)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: [renameChatTitle.mutationKey, chatId],
        mutationFn: renameChatTitle.mutationFn,
        onSuccess: () => {
            // `invalidateQueries` won't work if we directly pass multiple queries.
            // They rather match with the prefix to match the queries.
            // In our case, we have two different queries
            // Ref - https://tanstack.com/query/v4/docs/react/guides/query-invalidation
            queryClient.invalidateQueries([getChatHistory.queryKey])
            queryClient.invalidateQueries([getChatMessages.queryKey, chatId])
            closeModal()
        },
    })

    return (
        <Modal showModal={showModal} onClose={closeModal} className="flex flex-col gap-y-6">
            <h1 className="text-xl font-bold text-[#2D2D2D]">Rename Title</h1>
            <input
                className="rounded-xl border px-4 py-2"
                type="text"
                autoFocus
                value={input}
                onChange={e => {
                    e.preventDefault()
                    setInput(e.target.value)
                }}
                placeholder="Enter New Title"
            />

            <div className="flex items-center justify-end gap-x-2">
                <Button variant="passivePrimary" onClick={closeModal}>
                    Cancel
                </Button>
                <ButtonWithLoader
                    isLoading={mutation.isLoading}
                    onClick={() => {
                        mutation.mutate({ chatId, newTitle: input })
                    }}
                >
                    Save
                </ButtonWithLoader>
            </div>
        </Modal>
    )
}

type TProps = { originalTitle: string; chatId: string }

export const RenameChatTitle = (props: TProps) => {
    const { originalTitle, chatId } = props

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    return (
        <>
            <li
                className="body-regular flex w-full cursor-pointer gap-[15px]"
                onClick={() => setShowModal(true)}
            >
                <BsPencilSquare className="h-5 w-5" />
                Rename Search
            </li>
            <RenameChatTitleModal
                showModal={showModal}
                closeModal={closeModal}
                originalTitle={originalTitle}
                chatId={chatId}
            />
        </>
    )
}

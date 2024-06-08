import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { LuTrash2 } from 'react-icons/lu'

import { Button } from '@/components/shared'
import { Modal } from '@/components/shared/modals/Modal'
import { getRepository } from '@/queries/repository'
import { useFileUploadStore } from '@/store/file-upload-store'
import { FileItem } from './FileItem'

export const ConfirmUploadModal = () => {
    const { newFileUploads, showConfirmModal, toggleShowConfirmModal } = useFileUploadStore(
        state => ({
            newFileUploads: state.newFileUploads,
            showConfirmModal: state.showConfirmModal,
            toggleShowConfirmModal: state.toggleShowConfirmModal,
        }),
    )

    useEffect(() => {
        if (newFileUploads.length === 0) {
            toggleShowConfirmModal(false)
        }
    }, [newFileUploads.length, toggleShowConfirmModal])

    return (
        <Modal
            showModal={showConfirmModal}
            className="flex max-w-sm flex-col rounded-md p-0 md:p-0"
            onClose={() => toggleShowConfirmModal(false)}
        >
            <div className="flex items-center gap-3 p-5">
                <h2 className="text-lg font-medium">📤</h2>
                <h2 className="text-lg font-medium">Upload Files to Repository?</h2>
            </div>

            <div className="flex flex-col gap-y-2 border-t border-neutral-400">
                <div className="flex max-h-[305px] flex-col gap-y-4 overflow-auto py-4">
                    {newFileUploads.map(file => (
                        <div key={file.filename} className="flex items-center justify-between px-5">
                            <FileItem file={file.file} />
                            <RemoveFileButton filename={file.filename} />
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-x-2 px-5 pb-5">
                    <CancelButton />
                    <SaveButton />
                </div>
            </div>
        </Modal>
    )
}

const RemoveFileButton = (props: { filename: string }) => {
    const { filename } = props
    const removeNewFile = useFileUploadStore(state => state.removeNewFile)

    return (
        <button className="outline-none" onClick={() => removeNewFile(filename)}>
            <LuTrash2 className="h-5 w-5" />
        </button>
    )
}

const CancelButton = () => {
    const toggleShowConfirmModal = useFileUploadStore(state => state.toggleShowConfirmModal)

    return (
        <Button
            variant="passivePrimary"
            onClick={() => {
                toggleShowConfirmModal(false)
            }}
        >
            Cancel Upload
        </Button>
    )
}

const SaveButton = () => {
    const { toggleShowConfirmModal, confirmUploadingNewFiles } = useFileUploadStore(state => ({
        toggleShowConfirmModal: state.toggleShowConfirmModal,
        confirmUploadingNewFiles: state.confirmUploadingNewFiles,
    }))

    const queryClient = useQueryClient()
    const refreshRepository = () => {
        queryClient.invalidateQueries([getRepository.queryKey])
    }

    return (
        <Button
            variant="primary"
            onClick={() => {
                toggleShowConfirmModal(false)
                confirmUploadingNewFiles({ onUploadSuccess: refreshRepository })
            }}
        >
            Yes, Upload Files
        </Button>
    )
}

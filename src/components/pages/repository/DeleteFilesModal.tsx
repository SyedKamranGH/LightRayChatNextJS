import { Popover } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, ButtonWithLoader } from '@/components/shared'
import { Modal } from '@/components/shared/modals/Modal'
import { IFileMetadata, getRepository, purgeFilesFromRepository } from '@/queries/repository'

interface IDeleteFilesActionModalProps {
    filename: string
    show: boolean
    selectedFiles: Pick<IFileMetadata, 'fileId'>[]
    onClose: () => void
}

export const DeleteFilesActionModal = (props: IDeleteFilesActionModalProps) => {
    const { filename, selectedFiles, show, onClose } = props

    const queryClient = useQueryClient()

    const { mutate, isLoading: isDeleting } = useMutation({
        mutationKey: [purgeFilesFromRepository.mutationKey],
        mutationFn: purgeFilesFromRepository.mutationFn,
        onSuccess: () => {
            onClose()
            queryClient.invalidateQueries([getRepository.queryKey])
        },
    })

    return (
        <Modal showModal={show} className="flex flex-col gap-y-6" onClose={onClose}>
            <h2 className="text-xl font-bold">Delete File Confirmation</h2>

            <p className="text-md text-gray-500">
                Are you sure you want to delete the file <strong>{filename}</strong> ?<br />
                Once deleted, it cannot be recovered.
            </p>

            <div className="flex items-center justify-end gap-x-2">
                <Button variant="passivePrimary" onClick={onClose}>
                    Cancel
                </Button>

                {/* 
                    We want to close the file-actions popover after deleting the file.
                    This modal is rendered as a child of the popover, so to manually close the popover,
                    we need to put a Popover.Button in the Popover.Panel (which is the great grandparent of this modal).
                    When this Popover.Button is clicked, it will close the Popover.
                */}
                <Popover.Button>
                    <ButtonWithLoader
                        variant="danger"
                        onClick={() => {
                            mutate({ fileIds: selectedFiles.map(f => f.fileId) })
                        }}
                        isLoading={isDeleting}
                    >
                        Delete
                    </ButtonWithLoader>
                </Popover.Button>
            </div>
        </Modal>
    )
}

import { Button } from '@/components/shared'
import { Modal } from '@/components/shared/modals/Modal'
import { useFileUploadStore } from '@/store/file-upload-store'
import { FileItem } from './FileItem'

const supportedFileExtensions = ['.pdf', '.txt', '.doc', '.docx']

export const UnsupportedFilesModal = () => {
    const { unsupportedFiles, showUnsupportedFilesModal, toggleShowUnsupportedFilesModal } =
        useFileUploadStore(state => ({
            unsupportedFiles: state.unsupportedFiles,
            showUnsupportedFilesModal: state.showUnsupportedFilesModal,
            toggleShowUnsupportedFilesModal: state.toggleShowUnsupportedFilesModal,
        }))

    const supportedFileExtensionsString = [
        supportedFileExtensions.slice(0, -1).join(', '),
        supportedFileExtensions[supportedFileExtensions.length - 1],
    ].join(', and ')

    const description = `Files other than ${supportedFileExtensionsString} are not supported.`

    return (
        <Modal
            showModal={showUnsupportedFilesModal}
            className="flex max-w-sm flex-col rounded-md p-0 md:p-0"
            onClose={() => toggleShowUnsupportedFilesModal}
        >
            <div className="flex items-center gap-3 p-5">
                <h2 className="text-lg font-medium">⛔️</h2>
                <h2 className="text-lg font-medium">Unsupported Files</h2>
            </div>

            <div className="flex flex-col gap-5 border-t border-neutral-400 p-5">
                <p className="text-black">{description}</p>

                <div className="flex max-h-[305px] flex-col gap-y-4 overflow-auto">
                    {unsupportedFiles.map(file => (
                        <FileItem key={file.name} file={file} className="text-gray-400" />
                    ))}
                </div>

                <div className="flex items-center justify-end gap-x-2">
                    <CancelButton />
                    <UploadButton />
                </div>
            </div>
        </Modal>
    )
}

const CancelButton = () => {
    const toggleShowUnsupportedFilesModal = useFileUploadStore(
        state => state.toggleShowUnsupportedFilesModal,
    )

    return (
        <Button
            variant="passivePrimary"
            onClick={() => {
                toggleShowUnsupportedFilesModal(false)
            }}
        >
            Cancel
        </Button>
    )
}

const UploadButton = () => {
    const { newFileUploads, toggleShouldShowConfirmModal, toggleShowUnsupportedFilesModal } =
        useFileUploadStore(state => ({
            newFileUploads: state.newFileUploads,
            toggleShouldShowConfirmModal: state.toggleShowConfirmModal,
            toggleShowUnsupportedFilesModal: state.toggleShowUnsupportedFilesModal,
        }))

    return (
        <Button
            variant="primary"
            onClick={() => {
                toggleShowUnsupportedFilesModal(false)

                // No need to show the confirm modal if there are no files to upload
                if (newFileUploads.length > 0) {
                    toggleShouldShowConfirmModal(true)
                }
            }}
        >
            Upload Other Files
        </Button>
    )
}

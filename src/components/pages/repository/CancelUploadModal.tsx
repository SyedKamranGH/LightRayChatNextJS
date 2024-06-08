import { Button } from '@/components/shared'
import { Modal } from '@/components/shared/modals/Modal'
import { useFileUploadStore } from '@/store/file-upload-store'

export const CancelUploadModal = () => {
    const [showCancelModal, toggleShowCancelModal] = useFileUploadStore(state => [
        state.showCancelModal,
        state.toggleShowCancelModal,
    ])

    return (
        <Modal
            showModal={showCancelModal}
            className="flex max-w-lg flex-col rounded-md p-0 md:p-0"
            onClose={() => toggleShowCancelModal(false)}
        >
            <div className="flex items-center gap-3 p-5">
                <h2 className="font-montserrat text-lg font-medium">⚠️</h2>
                <h2 className="text-lg font-medium">Stop Upload?</h2>
            </div>

            <div className="flex flex-col gap-y-2 border-t border-neutral-400">
                <div className="flex flex-col gap-y-4 overflow-auto px-5 py-4">
                    Your upload is not complete. Would you like to stop it?
                </div>

                <div className="flex flex-col-reverse items-center justify-end gap-2 px-5 pb-5 sm:flex-row">
                    <CancelUploadButton />
                    <ContinueUploadButton />
                </div>
            </div>
        </Modal>
    )
}

const ContinueUploadButton = () => {
    const toggleShowCancelModal = useFileUploadStore(state => state.toggleShowCancelModal)

    return (
        <Button
            variant="primary"
            className="w-full rounded-md py-3 sm:w-fit"
            onClick={() => {
                toggleShowCancelModal(false)
            }}
        >
            Don&apos;t stop, continue uploading
        </Button>
    )
}

const CancelUploadButton = () => {
    const { toggleShowCancelModal, resetUploadProgress } = useFileUploadStore(state => ({
        toggleShowCancelModal: state.toggleShowCancelModal,
        resetUploadProgress: state.resetUploadProgress,
    }))

    return (
        <Button
            variant="passivePrimary"
            className="w-full rounded-md py-3 sm:w-fit"
            onClick={() => {
                toggleShowCancelModal(false)
                resetUploadProgress()
            }}
        >
            Stop all uploads
        </Button>
    )
}

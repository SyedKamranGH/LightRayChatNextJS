import { BsChevronUp, BsXLg } from 'react-icons/bs'
import { twJoin } from 'tailwind-merge'

import { useFileUploadStore } from '@/store/file-upload-store'

import { UploadProgressFileListItem } from './UploadProgressFileListItem'
import { UploadProgressTitle } from './UploadProgressTitle'
import { WithTooltip } from '@/components/shared/tooltips/WithTooltip'

export const UploadProgress = () => {
    const { files, isModalMinimized, toggleIsUploadProgressMinimized } = useFileUploadStore(
        state => ({
            files: state.fileUploads,
            isModalMinimized: state.isUploadProgressMinimized,
            toggleIsUploadProgressMinimized: state.toggleIsUploadProgressMinimized,
        }),
    )

    return (
        // Separating into two divs to handle positioning and styling separately
        <div className="absolute bottom-4 w-screen rounded-md px-4 shadow-lg sm:bottom-5 sm:right-5 sm:w-[35rem] sm:px-0 lg:bottom-10 lg:right-10">
            <div className="w-full overflow-hidden rounded-md bg-white">
                <div
                    className="flex items-center justify-between p-5"
                    onDoubleClick={() => toggleIsUploadProgressMinimized(!isModalMinimized)}
                >
                    <UploadProgressTitle />

                    <div className="flex items-center gap-x-5 pr-1">
                        <CollapseButton />
                        <CloseButton />
                    </div>
                </div>

                <div
                    className={twJoin(
                        'flex flex-col duration-500 ease-in-out',
                        isModalMinimized ? 'max-h-0' : 'max-h-[10.1rem]',
                    )}
                >
                    {/* Separated padding from the parent div for smoother minimizing animation */}
                    {/* Border of max-h-0 component is visible. Moved the border to this child to hide it. */}
                    <div className="overflow-y-auto border-t border-neutral-400 px-5 py-2">
                        {files.map(file => (
                            <UploadProgressFileListItem key={file.filename} fileUpload={file} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CollapseButton = () => {
    const { isModalMinimized, toggleIsUploadProgressMinimized } = useFileUploadStore(state => ({
        isModalMinimized: state.isUploadProgressMinimized,
        toggleIsUploadProgressMinimized: state.toggleIsUploadProgressMinimized,
    }))

    return (
        <button onClick={() => toggleIsUploadProgressMinimized(!isModalMinimized)}>
            <WithTooltip tooltipText="Maximize">
                <BsChevronUp
                    className={twJoin('stroke-[0.5] text-black', !isModalMinimized && 'rotate-180')}
                    size={16}
                />
            </WithTooltip>
        </button>
    )
}

const CloseButton = () => {
    const { fileUploads, toggleShowCancelModal, resetUploadProgress } = useFileUploadStore(
        state => ({
            fileUploads: state.fileUploads,
            toggleShowCancelModal: state.toggleShowCancelModal,
            resetUploadProgress: state.resetUploadProgress,
        }),
    )

    const close = () => {
        const isUploadFinished = fileUploads.every(file => file.status === 'finished')

        // bypass cancel upload modal
        if (isUploadFinished) {
            resetUploadProgress()
            return
        }

        toggleShowCancelModal(true)
    }

    return (
        <WithTooltip tooltipText="Close">
            <button onClick={close}>
                <BsXLg className="text-blck stroke-1" size={14} />
            </button>
        </WithTooltip>
    )
}

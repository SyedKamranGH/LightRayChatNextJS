import { twMerge } from 'tailwind-merge'

import { LoadingIcon } from '@/components/shared/icons'
import { useFileUploadStore } from '@/store/file-upload-store'

export const UploadProgressTitle = () => {
    const fileUploads = useFileUploadStore(state => state.fileUploads)

    // Uploading
    const filesToUpload = fileUploads.filter(
        file => file.status === 'new' || file.status === 'uploading',
    )
    if (filesToUpload.length > 0) {
        return (
            <Title leftIcon={<LoadingIcon className="h-5 w-5 text-black" />}>
                Uploading Files ({filesToUpload.length})
            </Title>
        )
    }

    // All uploads are successful
    if (fileUploads.every(file => file.status === 'finished')) {
        return <Title leftIcon="✅">Files Uploaded!</Title>
    }

    // Contains failed uploads
    const failedFileUploads = fileUploads.filter(file => file.status === 'failed')
    if (failedFileUploads.length > 0) {
        return <Title leftIcon="❗">Upload Failed</Title>
    }

    // Default
    return <Title>File uploads will be shown here!</Title>
}

const Title = (props: {
    className?: string
    children?: React.ReactNode
    leftIcon?: React.ReactNode
}) => {
    const { className, children, leftIcon } = props
    return (
        <div className="flex items-center gap-3">
            {leftIcon}
            <h2 className={twMerge('text-lg text-black', className)}>{children}</h2>
        </div>
    )
}

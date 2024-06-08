import { useEffect, useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { TbReload } from 'react-icons/tb'
import { twJoin } from 'tailwind-merge'

import { FileUpload, useFileUploadStore } from '@/store/file-upload-store'

import { FileItem } from '../FileItem'
import { ProgressCircle } from './ProgressCircle'
import { useQuery } from '@tanstack/react-query'
import { getRepositoryFile } from '@/queries/repository'

type TProps = {
    fileUpload: FileUpload
}

export const UploadProgressFileListItem = (props: TProps) => {
    const { fileUpload } = props

    return (
        <div className="flex gap-x-2 py-3 align-middle">
            <div className="w-2/3">
                <FileItem
                    className={twJoin(
                        (fileUpload.status === 'new' || fileUpload.status === 'failed') &&
                            'text-gray-400',
                    )}
                    file={fileUpload.file}
                />
            </div>
            <div className="flex w-1/3">
                <UploadProgressFileStatus fileUpload={fileUpload} />
            </div>
        </div>
    )
}

const UploadProgressFileStatus = (props: TProps) => {
    const { fileUpload } = props

    const retryUploadingFile = useFileUploadStore(state => state.retryUploadingFile)

    const uploadProgress = Math.min(99, fileUpload.uploadProgress)

    return (
        <div className="flex min-w-[8rem] flex-1 justify-end">
            {fileUpload.status === 'finished' && (
                <div className="flex items-center gap-3 text-green-600">
                    <p className="text-xs font-medium">Completed</p>
                    <BsCheck2 className="stroke-[0.5]" size={20} />
                </div>
            )}
            {fileUpload.status === 'failed' && (
                <div className="flex items-center gap-3 text-red-600">
                    <p className="text-xs font-medium">Upload failed</p>
                    <button onClick={() => retryUploadingFile(fileUpload.filename)}>
                        <TbReload size={20} />
                    </button>
                </div>
            )}
            {fileUpload.status === 'uploading' && (
                <UploadProgress uploadProgress={uploadProgress} />
            )}
            {fileUpload.status === 'embedding' && !!fileUpload.fileId && (
                <EmbeddingProgress
                    fileRepositoryId={fileUpload.fileId}
                    filename={fileUpload.filename}
                />
            )}
        </div>
    )
}

const UploadProgress = ({ uploadProgress }: { uploadProgress: number }) => {
    return (
        <div className="flex items-center gap-3">
            <p className="small-regular text-yellow-400">Uploading</p>
            <ProgressCircle
                className="transition"
                foregroundClassName="text-yellow-400"
                size={16}
                percent={uploadProgress}
            />
        </div>
    )
}

const EmbeddingProgress = ({
    fileRepositoryId,
    filename,
}: {
    fileRepositoryId: string
    filename: string
}) => {
    const [progress, setProgress] = useState(0)
    const updateFileUploadStatus = useFileUploadStore(state => state.updateFileUploadStatus)

    const { data, isError } = useQuery({
        queryKey: [getRepositoryFile.queryKey, fileRepositoryId],
        queryFn: () => getRepositoryFile.queryFn({ fileRepositoryId }),
        enabled: progress < 100,
        // Refetch after n seconds
        refetchInterval: 3000,
    })

    // Update progress. It is not advised to use onSuccess handler
    useEffect(() => {
        if (!!data) {
            setProgress(data.progress)
        }
    }, [data])

    // Update status
    useEffect(() => {
        if (progress === 100) {
            updateFileUploadStatus(filename, 'finished')
        }
        if (isError) {
            updateFileUploadStatus(filename, 'failed')
        }
    }, [progress, updateFileUploadStatus, isError, filename])

    return (
        <div className="flex items-center gap-3">
            <p className="small-regular text-zinc-400" hidden={progress > 0}>
                Waiting to be read...
            </p>
            <p className="small-regular text-yellow-400" hidden={progress === 0}>
                Reading...
            </p>
            <ProgressCircle
                className="transition"
                foregroundClassName="text-yellow-400"
                size={16}
                percent={progress}
            />
        </div>
    )
}

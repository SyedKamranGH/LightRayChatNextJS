import { useQuery } from '@tanstack/react-query'
import { RefObject, useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { twJoin } from 'tailwind-merge'

import { LoadingIcon } from '@/components/shared/icons'
import { useScreenSize } from '@/hooks/useScreenSize'
import { getRepository } from '@/queries/repository'
import { useFileUploadStore } from '@/store/file-upload-store'

import { CancelUploadModal } from '../CancelUploadModal'
import { ConfirmUploadModal } from '../ConfirmUploadModal'
import { UnsupportedFilesModal } from '../UnsupportedFilesModal'
import { UploadProgress } from '../UploadProgress'
import { DataTable } from '../table'
import { Columns } from './Columns'
import { EmptyRepository } from './EmptyRepository'
import { FilesPagination } from './FilesPagination'
import { MobileColumns } from './MobileColumns'

const pageSize = 10

/**
 * Using the file-upload store.
 *
 * The flow is as follows:
 * - The user uploads files.
 * - The unsupported-files modal pops up if there are unsupported files.
 * - The confirm-upload modal pops up if there are files to upload.
 * - The cancel-upload modal pops up if the user closes the upload progress and there are unfinished uploads.
 */
export const AllFilesSection = (props: { uploadInputRef: RefObject<HTMLInputElement> }) => {
    const { uploadInputRef } = props

    const { isMobile } = useScreenSize()

    const { data: documents = [], isLoading } = useQuery({
        queryKey: [getRepository.queryKey],
        queryFn: getRepository.queryFn,
    })

    const [pageIndex, setPageIndex] = useState(0)

    const { showUploadProgress, handleUnsupportedFiles, validateAndAddFiles } = useFileUploadStore(
        state => ({
            showUploadProgress: state.showUploadProgress,
            handleUnsupportedFiles: state.handleUnsupportedFiles,
            validateAndAddFiles: state.validateAndAddFiles,
        }),
    )

    const onDropAccepted = useCallback(
        (chosenFiles: File[]) => {
            validateAndAddFiles(chosenFiles)
        },
        [validateAndAddFiles],
    )
    const onDropRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            handleUnsupportedFiles(fileRejections.map(rejection => rejection.file))
        },
        [handleUnsupportedFiles],
    )
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'application/*': ['.pdf', '.doc', '.docx'],
            'text/plain': ['.txt'],
        },
        onDropAccepted,
        onDropRejected,
    })

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="font-title text-lg font-medium">
                    All Files {isLoading ? '' : `(${documents.length})`}
                </h2>

                {!isMobile && (
                    <FilesPagination
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        documentLength={documents.length}
                        onPageIndexChange={setPageIndex}
                    />
                )}
            </div>

            <div {...getRootProps()} className="h-full w-full overflow-y-auto">
                <input {...getInputProps()} ref={uploadInputRef} />

                <div
                    className={twJoin(
                        'relative flex h-full w-full flex-col pb-5',
                        isDragActive
                            ? 'rounded-lg border-2 border-blue-300 bg-blue-50'
                            : 'border-2 border-transparent',
                    )}
                >
                    {isDragActive && (
                        <div className="absolute bottom-8 left-1/2 -ml-[50px]">
                            <AiOutlineCloudUpload size={100} />
                            <p>Drop your file</p>
                        </div>
                    )}

                    {isLoading ? (
                        <LoadingIcon />
                    ) : (
                        <DataTable
                            data={documents}
                            columns={isMobile ? MobileColumns : Columns}
                            pageSize={pageSize}
                            pageIndex={pageIndex}
                            emptyList={
                                <EmptyRepository onUpload={() => uploadInputRef.current?.click()} />
                            }
                        />
                    )}
                </div>

                {isMobile && (
                    <FilesPagination
                        className="absolute bottom-4 right-4"
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        documentLength={documents.length}
                        onPageIndexChange={setPageIndex}
                    />
                )}

                {showUploadProgress && <UploadProgress />}

                <UnsupportedFilesModal />

                <ConfirmUploadModal />

                <CancelUploadModal />
            </div>
        </div>
    )
}

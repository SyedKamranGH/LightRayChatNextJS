import { toast } from 'react-toastify'
import { create } from 'zustand'

import { ToastError } from '@/components/shared/toast/ToastError'
import { uploadDocumentToRepository } from '@/queries/repository'

// TODO: debug-next is not working in the browser.
// One possible cause is that the browser doesn't have access to `DEBUG` env variable.
// The browser only has access to env variables prefixed with `NEXT_PUBLIC_`.
// const { log, logError } = Log()
const { log, error: logError } = console

export type UploadStatus = 'new' | 'uploading' | 'embedding' | 'finished' | 'failed'

export type FileUpload = {
    status: UploadStatus
    filename: string
    uploadProgress: number
    fileId?: string
    file: File
}

type TUploadOptions = { onUploadSuccess?: () => void }

interface State {
    fileUploads: FileUpload[]
    newFileUploads: FileUpload[]
    unsupportedFiles: Pick<File, 'name' | 'size'>[]

    isUploading: boolean
    isUploadProgressMinimized: boolean
    showUploadProgress: boolean
    showUnsupportedFilesModal: boolean
    showConfirmModal: boolean
    showCancelModal: boolean
}

interface Action {
    handleUnsupportedFiles: (files: File[]) => void
    validateAndAddFiles: (files: File[]) => void
    removeNewFile: (filename: string) => void
    confirmUploadingNewFiles: (uploadOptions?: TUploadOptions) => void
    uploadFile: (fileUpload: FileUpload, options?: TUploadOptions) => Promise<void>
    startUploading: (uploadOptions?: TUploadOptions) => void
    retryUploadingFile: (filename: string) => void
    resetUploadProgress: () => void

    updateFileId: (filename: string, fileId: string) => void
    updateFileUploadStatus: (filename: string, status: UploadStatus) => void
    updateFileUploadProgress: (filename: string, uploadProgress: number) => void

    toggleIsUploadProgressMinimized: (flag: boolean) => void
    toggleShowUnsupportedFilesModal: (flag: boolean) => void
    toggleShowConfirmModal: (flag: boolean) => void
    toggleShowCancelModal: (flag: boolean) => void
}

export const useFileUploadStore = create<State & Action>((set, get) => ({
    /**
     * This is the upload that will be looked up when uploading files.
     */
    fileUploads: [],

    /**
     * This holds the newly added files. They are stored here before the user confirms them.
     */
    newFileUploads: [],

    /**
     * This holds the files that the user added but are not supported.
     */
    unsupportedFiles: [],

    isUploading: false,
    isUploadProgressMinimized: false,
    showUploadProgress: false,
    showUnsupportedFilesModal: false,
    showConfirmModal: false,
    showCancelModal: false,

    handleUnsupportedFiles: (files: File[]) => {
        log('Handling unsupported files')
        set({ unsupportedFiles: files, showUnsupportedFilesModal: true })
    },

    validateAndAddFiles: (files: File[]) => {
        log('Validating files')

        const { fileUploads: storedFileUploads, unsupportedFiles } = get()

        const notDuplicated = (file: File) => {
            return (
                storedFileUploads.findIndex(fileUpload => fileUpload.filename === file.name) === -1
            )
        }

        const newFiles = files.filter(notDuplicated)
        const newFileUploads: FileUpload[] = newFiles.map(file => ({
            status: 'new',
            filename: file.name,
            file,
            uploadProgress: 0,
        }))

        if (newFileUploads.length === 0) {
            logError('All new files are either not supported or already in the store')
            return
        }

        // If there are unsupported files, the confirm modal won't show here
        // The unsupported files modal will ask the user what to do next
        log('Adding new files', { newFileNames: newFileUploads.map(file => file.filename) })
        set({ newFileUploads, showConfirmModal: unsupportedFiles.length === 0 })
    },

    removeNewFile: (filename: string) => {
        log('Removing new file', filename)
        const newFileUploads = get().newFileUploads.filter(
            fileUpload => fileUpload.filename !== filename,
        )
        set({ newFileUploads })
    },

    /**
     * Add the new files to `fileUploads` (queue), and start uploading
     */
    confirmUploadingNewFiles: uploadOptions => {
        log('Confirmed new files')
        const { fileUploads, newFileUploads, startUploading } = get()
        set({ fileUploads: [...fileUploads, ...newFileUploads], newFileUploads: [] })
        startUploading(uploadOptions)
    },

    /**
     * This will make the API call to the server */
    uploadFile: async (fileUpload, options) => {
        const { updateFileUploadStatus, updateFileUploadProgress, updateFileId } = get()

        await uploadDocumentToRepository
            .mutationFn(fileUpload.file, {
                onUploadProgress: progressInPercent => {
                    updateFileUploadProgress(fileUpload.filename, progressInPercent)
                },
            })
            // Update file id
            .then(response => {
                log('Done uploading file', fileUpload.filename)
                if (response.fileId) {
                    updateFileId(fileUpload.filename, response.fileId)
                }
            })
            // Update file status
            .then(() => {
                updateFileUploadStatus(fileUpload.filename, 'embedding')

                if (options?.onUploadSuccess) {
                    options.onUploadSuccess()
                }
            })
            .catch(error => {
                const message = error.message || String(error)
                toast(<ToastError title="Files Uploading Error" message={message} />, {
                    type: 'error',
                    icon: false,
                })
                logError('Error uploading file', { filename: fileUpload.filename, error })
                updateFileUploadStatus(fileUpload.filename, 'failed')
            })
    },

    startUploading: async uploadOptions => {
        log('Triggered uploading')
        const { isUploading, fileUploads, updateFileUploadStatus, uploadFile } = get()

        // The function has already been triggered.
        // This happens when the user adds more files to upload
        // while there are files already being uploaded.
        if (isUploading) {
            log('Already started uploading')
            return
        }

        // This shouldn't happen since `startUploading` is only triggered
        // after the new files are added to the queue.
        const hasFileToUpload = fileUploads.find(fileUpload => fileUpload.status === 'new')
        if (!hasFileToUpload) {
            logError('Triggered uploading but no new files to upload', { fileUploads })
            return
        }

        set({ isUploading: true, showUploadProgress: true })

        // Start uploading
        while (get().fileUploads.find(fileUpload => fileUpload.status === 'new')) {
            // Find file to upload
            const fileUpload = get().fileUploads.find(fileUpload => fileUpload.status === 'new')

            // This shouldn't happen. The loop should break before this.
            if (!fileUpload) {
                logError('Cannot find file to upload', { fileUpload })
                continue
            }

            log('Uploading file', fileUpload.filename)
            updateFileUploadStatus(fileUpload.filename, 'uploading')

            // API call
            await uploadFile(fileUpload, uploadOptions)
        }

        set({ isUploading: false })
    },

    // TODO: Add retry-all-failed-uploads mechanism
    retryUploadingFile: async (filename: string) => {
        log('Retry uploading file', filename)
        const { fileUploads, uploadFile, updateFileUploadStatus } = get()

        const fileUpload = fileUploads.find(file => file.filename === filename)

        if (!fileUpload || fileUpload.status !== 'failed') {
            logError('No file to retry uploading', { fileUpload })
            return
        }

        updateFileUploadStatus(fileUpload.filename, 'uploading')

        await uploadFile(fileUpload)
    },

    resetUploadProgress: () => {
        log('Resetting upload progress')

        // Closing the upload-progress modal after cancelling (following google drive ux)
        set({
            fileUploads: [],
            newFileUploads: [],
            isUploading: false,
            showUploadProgress: false,
        })
    },

    updateFileId: (filename: string, fileId: string) => {
        const fileUploads = [...get().fileUploads]

        const fileToUploadIndex = fileUploads.findIndex(file => file.filename === filename)

        if (!fileUploads[fileToUploadIndex]) {
            logError('Failed to update file id', { filename, status })
            return
        }

        fileUploads[fileToUploadIndex].fileId = fileId

        set({ fileUploads })
    },

    updateFileUploadStatus: (filename: string, status: UploadStatus) => {
        const fileUploads = [...get().fileUploads]

        const fileToUploadIndex = fileUploads.findIndex(file => file.filename === filename)

        if (!fileUploads[fileToUploadIndex]) {
            logError('Failed to update file upload status', { filename, status })
            return
        }

        fileUploads[fileToUploadIndex].status = status

        set({ fileUploads })
    },

    updateFileUploadProgress: (filename: string, uploadProgress: number) => {
        const fileUploads = [...get().fileUploads]

        const fileToUploadIndex = fileUploads.findIndex(file => file.filename === filename)

        if (!fileUploads[fileToUploadIndex]) {
            logError('Failed to update file upload progress', { filename, uploadProgress })
            return
        }

        fileUploads[fileToUploadIndex].uploadProgress = uploadProgress

        set({ fileUploads })
    },

    toggleIsUploadProgressMinimized: (flag: boolean) => {
        set({ isUploadProgressMinimized: flag })
    },

    toggleShowUnsupportedFilesModal: (flag: boolean) => {
        set({ showUnsupportedFilesModal: flag })
    },

    toggleShowConfirmModal: (flag: boolean) => {
        set({ showConfirmModal: flag })
    },

    toggleShowCancelModal: (flag: boolean) => {
        set({ showCancelModal: flag })
    },
}))

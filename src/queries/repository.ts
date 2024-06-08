import { Log } from 'debug-next'
import axiosInstance from '@/utils/axios'

const { logError } = Log()

const url = '/v1/repository/upload/single'
export const uploadDocumentToRepository = Object.freeze({
    mutationKey: url,
    mutationFn: async (
        file: File,
        options?: { onUploadProgress?: (progressInPercent: number) => void },
    ) => {
        const formData = new FormData()

        formData.set('document', file)

        const response = await axiosInstance.post<{ result: { fileId: string } }>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
                if (options?.onUploadProgress && typeof progressEvent.progress === 'number') {
                    options.onUploadProgress(progressEvent.progress * 100)
                }
            },
        })
        return response.data.result
    },
})

export interface IFileMetadata {
    // this user represents who shared the document
    user: {
        userId: string
        name: string
    }

    filename: string
    size: number
    mimetype: string

    fileId: string
    createdAt: string
    updatedAt: string
}

interface IRepositoryResponse {
    repository: IFileMetadata[]
}

export const getRepository = Object.freeze({
    queryKey: `/v1/repository/private`,
    queryFn: async (): Promise<IFileMetadata[]> => {
        const response = await axiosInstance.get<{ result: IRepositoryResponse }>(
            `/v1/repository/private`,
        )
        const result = response.data.result

        return result.repository
    },
})

interface IFileRepositoryResponse {
    file: {
        filename: string
        size: number
        mimetype: string

        fileId: string
        createdAt: string
        updatedAt: string
        status: string
        failReason: string
    }
    progress: number
}

export const getRepositoryFile = Object.freeze({
    queryKey: `/v1/repository`,
    queryFn: async ({ fileRepositoryId }: { fileRepositoryId: string }) => {
        const response = await axiosInstance.get<{ result: IFileRepositoryResponse }>(
            `/v1/repository/${fileRepositoryId}`,
        )
        return response.data.result
    },
})

export interface IPurgeFilesFromRepositoryRequest {
    fileIds: string[]
}

export const purgeFilesFromRepository = Object.freeze({
    mutationKey: `/v1/repository`,
    mutationFn: async ({ fileIds }: IPurgeFilesFromRepositoryRequest) => {
        // TODO :: report the fail count to the user
        for (const fileId of fileIds) {
            await axiosInstance.delete(`/v1/repository/${fileId}`).catch(error => {
                logError(error)
            })
        }
    },
})

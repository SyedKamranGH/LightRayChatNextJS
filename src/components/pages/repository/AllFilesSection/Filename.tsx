import { getRepositoryFile } from '@/queries/repository'
import { FileIcon } from '@/components/shared/icons'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ProgressBar } from '../UploadProgress/ProgressBar'

export const Filename = ({ fileDocument }: { fileDocument: any }) => {
    const [status, setStatus] = useState('new')
    const [failReason, setFailReason] = useState('')
    const [progress, setProgress] = useState(0)

    const { data, isError } = useQuery({
        queryKey: [getRepositoryFile.queryKey, fileDocument.fileId],
        queryFn: () => getRepositoryFile.queryFn({ fileRepositoryId: fileDocument.fileId }),
        enabled: status === 'embedding' || status === 'new',
        // Refetch after n seconds
        refetchInterval: 3000,
    })

    useEffect(() => {
        if (!!data?.file) {
            setProgress(data.progress)
            setStatus(data.file.status)

            if (data.file.status === 'fail') {
                setFailReason(data.file.failReason)
            }
        }
    }, [data])

    return (
        <div className="flex min-w-[200px] items-center gap-x-2">
            <FileIcon filename={fileDocument.filename} className="h-8 flex-shrink-0 basis-6" />
            <div className="flex flex-col">
                <p className="line-clamp-1 text-sm font-medium">{fileDocument.filename}</p>
                {(status === 'new' || (status === 'embedding' && progress === 0)) && (
                    <div className="flex items-center gap-3">
                        <p className="text-zinc-400">Waiting to be read...</p>
                    </div>
                )}
                {status === 'embedding' && progress > 0 && progress < 100 && (
                    <div className="flex items-center gap-3">
                        <p className="text-yellow-400">Reading...</p>
                        <div>
                            <ProgressBar percent={progress} />
                        </div>
                    </div>
                )}
                {status === 'fail' && <p className="text-error">Failed: {failReason}</p>}
            </div>
        </div>
    )
}

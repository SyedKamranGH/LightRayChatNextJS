import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    TGetDocumentsInChatResponse,
    getUploadedDocumentsInChat,
    removeUploadedDocument,
} from '@/queries/chat'
import { FiTrash2 } from 'react-icons/fi'
import { formatFileSize } from '@/utils/formatFileSize'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LoadingIcon } from '../../shared/icons'
import { useEffect, useState } from 'react'
import { getResearchDocument } from '@/queries/documents'
import { ProgressCircle } from '../repository/UploadProgress/ProgressCircle'
import { BsCheck2, BsX } from 'react-icons/bs'

type TDocument = TGetDocumentsInChatResponse['documents'][number]

const FileUploadStatus = ({ document, progress }: { document: TDocument; progress: number }) => {
    if (document.status === 'fail') {
        // Return cross
        return <BsX className="scale-125 text-error" size={20} />
    }
    // There is a bit of delay to update 'status' to 'success'. This is the reason for another check with `progress === 100`.
    if (document.status === 'success' || progress === 100) {
        // Return check
        return <BsCheck2 className="text-green-600" size={20} />
    }

    // Return progress bar
    return (
        <ProgressCircle
            className="scale-75 transition"
            foregroundClassName="text-yellow-400"
            size={20}
            percent={progress}
        />
    )
}

type TChatDocumentProps = {
    chatId: string
    document: TDocument
}

const ChatDocument = ({ document, chatId }: TChatDocumentProps) => {
    const queryClient = useQueryClient()

    const [progress, setProgress] = useState(0)
    const { data, isError } = useQuery({
        queryKey: [getResearchDocument.queryKey, document._id],
        queryFn: () => getResearchDocument.queryFn({ researchDocumentId: document._id }),
        refetchInterval: 3000,
        enabled: progress < 100 && document.status === 'embedding',
    })

    // TODO this should be replaced with some realtime protocol, such as SSE or PubSub
    useEffect(() => {
        if (!!data) {
            setProgress(data.progress)
        }
    }, [data])

    const deleteFile = useMutation({
        mutationKey: [removeUploadedDocument.mutationKey],
        mutationFn: async () => {
            return removeUploadedDocument.mutationFn(chatId, document._id)
        },
        onSuccess: async () => {
            return queryClient.invalidateQueries([getUploadedDocumentsInChat.queryKey, chatId])
        },
    })

    return (
        <div className="flex flex-col items-start">
            <div className="flex w-full gap-4">
                <div className="h-full w-[16px] pt-1">
                    <FileUploadStatus document={document} progress={progress} />
                </div>

                <TooltipProvider delayDuration={200}>
                    <div>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex w-60 items-center gap-1">
                                    <Image
                                        src="/assets/icons/file.svg"
                                        width={20}
                                        height={20}
                                        alt="file"
                                    />
                                    <p className="body-regular line-clamp-1 break-all">
                                        {document.filename}
                                    </p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white opacity-70">
                                {document.filename}
                            </TooltipContent>
                        </Tooltip>
                        {/* Format */}
                        <p className="body-regular text-[#ADADAD]">
                            {formatFileSize(document.size)}
                        </p>
                        {(document.status === 'new' ||
                            (document.status === 'embedding' && progress === 0)) && (
                            <p className="small-right text-zinc-400">Waiting to be read...</p>
                        )}
                        {document.status === 'embedding' && progress > 0 && progress < 100 && (
                            <p className="small-right text-yellow-400">Reading...</p>
                        )}
                        <p className="small-light text-error" hidden={document.status !== 'fail'}>
                            {document.failReason}
                        </p>
                    </div>
                </TooltipProvider>

                <div className="ml-auto h-full w-[20px]">
                    <button
                        onClick={() => deleteFile.mutate()}
                        aria-disabled={deleteFile.isLoading}
                    >
                        {deleteFile.isLoading ? (
                            <LoadingIcon className="h-4 w-4 text-black" />
                        ) : (
                            <FiTrash2 />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export const ChatDocuments = (props: { chatId: string }) => {
    const { chatId } = props

    const { data: documents = [] } = useQuery({
        queryKey: [getUploadedDocumentsInChat.queryKey, chatId],
        queryFn: () => getUploadedDocumentsInChat.queryFn({ chatId }),
    })

    return (
        <div className="h-full overflow-y-auto lg:w-[320px] lg:pr-4 lg:pt-16">
            <h4 className="h4-medium flex">
                <Image
                    src="/image/documents.png"
                    height={28}
                    width={28}
                    alt="document icon"
                    className="-translate-x-1 object-contain"
                />{' '}
                Documents ({documents.length})
            </h4>
            <p className="body-regular mt-10 text-left">
                Easily manage the files you have questions about. Browse your uploaded files, delete
                them, and add more when needed!
            </p>
            <div className="mt-10 flex flex-col gap-y-4">
                {documents.map(document => (
                    <ChatDocument key={document._id} chatId={chatId} document={document} />
                ))}
            </div>
            <div className="h-10"></div>
        </div>
    )
}

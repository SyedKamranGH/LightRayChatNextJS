import Image from 'next/image'
import { getResearchDocument } from '@/queries/documents'
import { formatFileSize } from '@/utils/formatFileSize'
import { useQuery } from '@tanstack/react-query'
import { TResearchDocument } from '@/queries/messages'
import { useEffect, useState } from 'react'
import { ProgressCircle } from '@/components/pages/repository/UploadProgress/ProgressCircle'

export const FileUploadProgressMessage = ({ document }: { document: TResearchDocument }) => {
    const { _id, filename } = document
    const researchDocumentId = _id.toString()

    // TODO: Need to update when we have new UX for this.
    const [progress, setProgress] = useState(0)
    const { data, isError } = useQuery({
        queryKey: [getResearchDocument.queryKey, researchDocumentId],
        queryFn: () => getResearchDocument.queryFn({ researchDocumentId }),
        // refetchInterval: 500,
        // enabled: progress < 100,
    })

    useEffect(() => {
        if (!!data) {
            setProgress(data.progress)
        }
    }, [data])

    return (
        <div
            className="flex-between w-full gap-4 rounded-[5px] border border-dashed border-grey-300 bg-grey-700 px-[12px] py-[10px] md:px-[20px] md:py-[15px]"
            key={researchDocumentId}
        >
            <div className="body-regular md:paragraph-regular flex w-4/5 items-center gap-2">
                <Image src="/assets/icons/file.svg" width={20} height={20} alt="file" />
                <p className="line-clamp-1">{filename}</p>
                <span className="shrink-0 text-[#ADADAD]">{formatFileSize(document.size)}</span>
            </div>
            {/* TODO: Progress bar */}
            {/* TODO: Implement preview feature */}
            {/* <Link href="" className="small-regular underline" target="_blank">
                            preview
                        </Link> */}
        </div>
    )
}

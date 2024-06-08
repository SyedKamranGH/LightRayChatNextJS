import Image from 'next/image'
import Link from 'next/link'

// we keep this for backward compatibility
const formatDocumentCitationLinkToFilename = (url: string) => {
    return url
        .replaceAll('_', ' ')
        .replaceAll('-', ' ')
        .replaceAll('.pdf', ' ')
        .replaceAll('hightlighted', ' ')
        .split('/')
        .pop()
}

export const DocumentCitation = ({
    url,
    citationFilename,
}: {
    url: string
    citationFilename?: string
}) => {
    return (
        <Link
            // route to NextJS API function
            // format - /api/citations/[filename]
            href={`/api/${url}`}
            className="flex-between w-full gap-4 rounded-[5px] border border-dashed border-grey-300 bg-grey-700 px-[12px] py-[10px] md:px-[20px] md:py-[15px]"
            target="_blank"
        >
            <div className="body-regular md:paragraph-regular flex items-center gap-2">
                <Image src="/assets/icons/file.svg" width={20} height={20} alt="file" />
                <p className="line-clamp-1">
                    {citationFilename || formatDocumentCitationLinkToFilename(url)}
                </p>
            </div>
        </Link>
    )
}

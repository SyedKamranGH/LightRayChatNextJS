import { BsGlobe } from 'react-icons/bs'

const formatWebPageCitationLink = (url: string) => {
    return new URL(url).hostname.replace('www.', '')
}

export const WebPageCitation = ({ url }: { url: string }) => {
    return (
        <a
            className="flex h-auto max-w-[320px] cursor-pointer gap-x-2 rounded-lg border border-dashed bg-white p-3"
            href={url}
            target="_blank"
        >
            <BsGlobe className="text-xl text-primary-700" />

            <p className="flex-1 truncate text-sm text-gray-400">
                {formatWebPageCitationLink(url)}
            </p>
        </a>
    )
}

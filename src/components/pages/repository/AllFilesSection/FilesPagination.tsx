import { BsChevronLeft } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

type TProps = {
    pageSize: number
    pageIndex: number
    documentLength: number
    onPageIndexChange: (index: number) => void
    className?: string
}

export const FilesPagination = (props: TProps) => {
    const { pageSize, pageIndex, documentLength, onPageIndexChange, className } = props

    const minimumPageIndex = 0
    const maximumPageIndex = Math.ceil(documentLength / 10) - 1
    const startIndex = pageIndex * pageSize + 1
    const endIndex = Math.min(startIndex + pageSize - 1, documentLength)

    if (documentLength === 0) {
        return
    }

    return (
        <div
            className={twMerge(
                'flex items-center gap-x-8 rounded-md border bg-white px-4 py-1',
                className,
            )}
        >
            <p className="text-sm leading-5 text-zinc-800">
                File {startIndex} - {endIndex} of {documentLength}
            </p>

            <div className="flex items-center gap-x-4 text-zinc-300">
                <button
                    className="p-1 hover:enabled:text-black"
                    onClick={() => onPageIndexChange(pageIndex - 1)}
                    disabled={pageIndex <= minimumPageIndex}
                >
                    <BsChevronLeft className="stroke-[0.5]" />
                </button>
                <button
                    className="p-1 hover:enabled:text-black"
                    onClick={() => onPageIndexChange(pageIndex + 1)}
                    disabled={pageIndex >= maximumPageIndex}
                >
                    <BsChevronLeft className="rotate-180 stroke-[0.5]" />
                </button>
            </div>
        </div>
    )
}

import { LuFileText } from 'react-icons/lu'

import { formatFileSize } from '@/utils/formatFileSize'
import { twMerge } from 'tailwind-merge'

export const FileItem = (props: { file: Pick<File, 'name' | 'size'>; className?: string }) => {
    const { file, className } = props

    const filename = file.name
    const fileSize = formatFileSize(file.size)

    return (
        <div className={twMerge('flex gap-3', className)}>
            <div className="flex gap-2">
                <LuFileText className="h-5 w-5 stroke-[1.5]" />
                <p className="max-w-[12rem] flex-grow truncate">{filename}</p>
            </div>
            <p className="min-w-[6rem]">{fileSize}</p>
        </div>
    )
}

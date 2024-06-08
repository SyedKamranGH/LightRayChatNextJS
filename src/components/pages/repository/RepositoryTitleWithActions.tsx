import { ButtonHTMLAttributes } from 'react'
import { FiUpload } from 'react-icons/fi'

import { Button } from '@/components/shared'
import { SearchIcon } from '@/components/shared/icons'

type TProps = { uploadFile: () => void }

export const RepositoryTitleWithActions = (props: TProps) => {
    const { uploadFile } = props

    return (
        <div className="mx-[15px] flex max-w-6xl items-center justify-between gap-x-6 md:mx-[150px] 2xl:mx-auto">
            {/* Title */}
            <h1 className="md:h1-medium max-lg:h4-medium font-title text-black">Repository</h1>

            {/* Actions */}
            <div className="flex items-center justify-center gap-x-4">
                {/* TODO: Complete file search implementation */}
                {/* <FileSearchBar /> */}
                <UploadFileButton onClick={uploadFile} />
            </div>
        </div>
    )
}

const FileSearchBar = () => {
    return (
        <div className="flex h-12 items-center gap-4 rounded-md border px-4">
            <SearchIcon className="h-6 w-6" />
            <input
                className="outline-none placeholder:text-black"
                placeholder="Search your files"
            />
        </div>
    )
}

const UploadFileButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Button
            className="flex h-12 w-12 scale-[0.7] gap-3 rounded-md p-0 sm:scale-100"
            variant="primary"
            {...props}
        >
            <FiUpload className="h-6 w-6" />
        </Button>
    )
}

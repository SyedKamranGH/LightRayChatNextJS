import { AiFillFileImage } from 'react-icons/ai'

import { CloseIcon } from '@/components/shared/icons'

interface IProps {
    name: string
    onRemove: (name: string) => void
}

const MAX_LENGTH = 15

export const FileItem = (props: IProps) => {
    const { name, onRemove } = props

    return (
        <div className="relative">
            <div className="flex items-center gap-3 rounded-lg border border-dashed bg-white p-3">
                <AiFillFileImage className="text-xl text-primary" />

                <p className="text-sm text-gray-400">
                    {name.length <= MAX_LENGTH ? name : name.slice(0, MAX_LENGTH) + '...'}
                </p>
            </div>

            <button
                onClick={e => {
                    e.preventDefault()
                    onRemove(name)
                }}
                className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300"
            >
                <CloseIcon className="h-2 w-2 text-center" />
            </button>
        </div>
    )
}

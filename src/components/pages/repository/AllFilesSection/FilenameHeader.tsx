import { Column } from '@tanstack/react-table'
import { HiArrowNarrowUp } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

import { IFileMetadata } from '@/queries/repository'

type TProps = { column: Column<IFileMetadata, unknown> }

export const FilenameHeader = ({ column }: TProps) => {
    const isUnsorted = !column.getIsSorted()
    const isAsc = column.getIsSorted() === 'asc'

    return (
        <button
            className="group flex items-center group-hover:cursor-pointer"
            onClick={() => column.toggleSorting(isAsc)}
        >
            Name
            <div className="ml-2 rounded-full bg-gray-100 p-1">
                <HiArrowNarrowUp
                    className={twMerge(
                        'h-3 w-3 text-zinc-800',
                        isUnsorted && 'text-zinc-300 group-hover:text-zinc-800',
                        isAsc && 'rotate-180',
                    )}
                />
            </div>
        </button>
    )
}

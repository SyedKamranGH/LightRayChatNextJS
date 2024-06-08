import { Column } from '@tanstack/react-table'
import { RiArrowDownSFill } from 'react-icons/ri'
import { twJoin } from 'tailwind-merge'

import { CheckboxIcon } from '@/components/shared/icons/CheckboxIcon'
import { PopoverMenu } from '@/components/shared/menu/PopoverMenu'
import { IFileMetadata } from '@/queries/repository'

type TProps = { column: Column<IFileMetadata, unknown> }

export const UploadDateHeader = ({ column }: TProps) => {
    return (
        <PopoverMenu
            renderButton={() => (
                <div className="flex w-full items-center justify-end md:justify-start">
                    <p>Upload Date</p>
                    <RiArrowDownSFill
                        className={twJoin('ml-2 h-4 w-4 text-neutral-500', 'ui-open:rotate-180')}
                    />
                </div>
            )}
            renderMenu={() => (
                <div className="flex flex-col gap-2 whitespace-nowrap py-3">
                    {/* TODO: Add lastOpened option */}
                    <UploadDateOption
                        checked={column.getIsSorted() === 'desc'}
                        label="Newest to oldest"
                        onClick={() => column.toggleSorting(true)}
                    />
                    <UploadDateOption
                        checked={column.getIsSorted() === 'asc'}
                        label="Oldest to newest"
                        onClick={() => column.toggleSorting(false)}
                    />
                </div>
            )}
            menuStyle="bg-white"
        />
    )
}

type TOptionProps = {
    checked: boolean
    label: string
    onClick: () => void
}

const UploadDateOption = ({ checked, label, onClick }: TOptionProps) => (
    <button
        className={twJoin('flex items-center gap-2 px-5 py-1', checked && 'bg-gray-100')}
        onClick={onClick}
    >
        <CheckboxIcon checked={checked} />
        <p className="text-sm font-normal text-black">{label}</p>
    </button>
)

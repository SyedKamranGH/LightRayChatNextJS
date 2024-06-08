import { ColumnDef } from '@tanstack/react-table'

import { FileIcon } from '@/components/shared/icons'
import { IFileMetadata } from '@/queries/repository'
import { formatDate } from '@/utils/formatDate'
import { formatFileSize } from '@/utils/formatFileSize'
import { FileActionsMenu } from '../FileActionsMenu/FileActionsMenu'
import { FilenameHeader } from './FilenameHeader'
import { UploadDateHeader } from './UploadDateHeader'

/**
 * This component contains our column definitions for mobile
 * This is where we define how the data is formatted, sorted and filtered
 */
export const MobileColumns: ColumnDef<IFileMetadata>[] = [
    {
        accessorKey: 'filename',
        header: FilenameHeader,
        cell: ({ row }) => {
            const filename = row.getValue('filename') as string
            const fileSize = formatFileSize(row.original.size)

            return (
                <div className="max-w-[190px]">
                    <div className="flex items-center gap-x-2">
                        <FileIcon filename={filename} className="h-8 flex-shrink-0 basis-6" />
                        <p className="line-clamp-1 text-sm font-medium text-gray-800">{filename}</p>
                    </div>
                    <p className="ml-8 text-xs text-neutral-500">{fileSize}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: UploadDateHeader,
        cell: ({ row }) => {
            const { fileId, filename, createdAt } = row.original

            return (
                <div className="flex flex-col items-end">
                    <p className="text-sm">{formatDate(createdAt)}</p>
                    <FileActionsMenu
                        fileId={fileId}
                        filename={filename}
                        buttonLayout="horizontal"
                    />
                </div>
            )
        },
    },
]

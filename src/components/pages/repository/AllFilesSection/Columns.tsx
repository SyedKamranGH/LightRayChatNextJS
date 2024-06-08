import { ColumnDef } from '@tanstack/react-table'

import { FileIcon } from '@/components/shared/icons'
import { UserProfileButton } from '@/components/shared/side-bar/UserProfileButton'
import { IFileMetadata } from '@/queries/repository'
import { formatDate } from '@/utils/formatDate'
import { formatFileSize } from '@/utils/formatFileSize'
import { FileActionsMenu } from '../FileActionsMenu/FileActionsMenu'
import { FilenameHeader } from './FilenameHeader'
import { UploadDateHeader } from './UploadDateHeader'
import { Filename } from './Filename'

/**
 * This component contains our column definitions
 * This is where we define how the data is formatted, sorted and filtered
 */
export const Columns: ColumnDef<IFileMetadata>[] = [
    {
        accessorKey: 'filename',
        header: FilenameHeader,
        cell: ({ row }) => {
            return <Filename fileDocument={row.original} />
        },
    },
    {
        accessorKey: 'user.name',
        header: 'Uploaded by',
        cell: ({ row }) => {
            const username = row.getValue('user_name') as string
            return (
                <div className="flex items-center gap-x-2">
                    <UserProfileButton name={username} />
                    <p className="text-sm">{username}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => {
            const size = row.getValue('size') as number
            return <p className="text-sm">{formatFileSize(size)}</p>
        },
    },
    {
        accessorKey: 'createdAt',
        sortingFn: 'datetime',
        header: UploadDateHeader,
        cell: ({ row }) => {
            const uploadDate = row.getValue('createdAt') as string
            return <p className="text-sm">{formatDate(uploadDate)}</p>
        },
    },
    {
        accessorKey: 'fileId',
        header: '',
        cell: ({ row }) => {
            const fileId = row.getValue('fileId') as string
            const filename = row.getValue('filename') as string
            return <FileActionsMenu fileId={fileId} filename={filename} />
        },
    },
]

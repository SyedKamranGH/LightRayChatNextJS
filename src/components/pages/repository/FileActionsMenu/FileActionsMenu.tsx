import { twJoin } from 'tailwind-merge'

import { MeatballsIcon } from '@/components/shared/icons'
import { PopoverMenu } from '@/components/shared/menu/PopoverMenu'
import { DeleteFile } from './DeleteFile'

type TProps = {
    fileId: string
    filename: string
    buttonLayout?: 'vertical' | 'horizontal'
}

export const FileActionsMenu = (props: TProps) => {
    const { fileId, filename, buttonLayout = 'vertical' } = props

    return (
        <PopoverMenu
            renderButton={() => (
                <MeatballsIcon
                    className={twJoin(
                        'relative h-6 w-6 cursor-pointer text-slate-300',
                        buttonLayout === 'vertical' && 'rotate-90',
                    )}
                />
            )}
            renderMenu={() => <DeleteFile fileId={fileId} filename={filename} />}
            menuStyle="py-2"
        />
    )
}

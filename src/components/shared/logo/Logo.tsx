/**
 * This component is only used in desktop UI
 */
import { twMerge } from 'tailwind-merge'

import { LogoIcon } from '../icons/LogoIcon'

type TProps = {
    iconStyle?: string
    containerStyle?: string
}

export const Logo = ({ iconStyle, containerStyle }: TProps) => {
    return (
        <div className={twMerge('flex-center gap-2', containerStyle)}>
            <LogoIcon className={iconStyle} />
        </div>
    )
}

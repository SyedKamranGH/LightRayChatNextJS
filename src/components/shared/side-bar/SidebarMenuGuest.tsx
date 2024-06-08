import { type ReactNode } from 'react'

import { HomeIcon } from '../icons'
import { LibraryIcon } from '../icons/LibraryIcon'
import { HistoryIcon } from '../icons/HistoryIcon'
import { MenuButton } from './SidebarMenu'
import { LoginIcon } from '../icons/LoginIcon'
import Link from 'next/link'

type TMenuButtonProps = {
    label: string
    href: string
    Icon: ({ className }: { className: string }) => ReactNode
}

const sidebarMenu: ReadonlyArray<TMenuButtonProps> = [
    { label: 'Home', Icon: ({ className }) => <HomeIcon className={className} />, href: '/' },
    {
        label: 'Library',
        Icon: ({ className }) => <LibraryIcon className={className} />,
        href: '/repository',
    },
    {
        label: 'Sign In',
        Icon: ({ className }) => <LoginIcon className={className} />,
        href: '/login',
    },
]

export const SidebarMenuGuest = () => {
    return (
        <>
            <div className="flex max-h-[300px] flex-1 flex-col gap-[5px] overflow-hidden overflow-y-auto">
                {sidebarMenu.map(menu => (
                    <MenuButton key={menu.label} {...menu} />
                ))}
            </div>
            <Link
                href="/signup"
                type="submit"
                className="mx-[30px] mt-6 w-full max-w-[200px] rounded-full bg-primary-700 p-2 text-center text-white"
            >
                Sign Up
            </Link>
        </>
    )
}

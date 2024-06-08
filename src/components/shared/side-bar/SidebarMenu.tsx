import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useState, type ReactNode } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

import { useAuthStore } from '@/store/auth-store'
import { WithTooltip } from '@/components/shared/tooltips/WithTooltip'

import { SidebarContext } from '..'
import {
    ChatIcon,
    DocIcon,
    FolderIcon,
    HomeIcon,
    NewsIcon,
    SearchIcon,
    GoogleDriveIcon,
} from '../icons'
import { WaitlistModal } from '../modals/WaitlistModal'
import { LibraryIcon } from '../icons/LibraryIcon'
import { HistoryIcon } from '../icons/HistoryIcon'
import { UploadIcon } from '../icons/UploadIcon'
import { TwoChecksIcon } from '../icons/TwoChecksIcon'
import { DropboxIcon } from '../icons/DropboxIcon'

type TMenuButtonProps = {
    label: string
    href: string
    Icon: ({ className }: { className: string }) => ReactNode
    tooltipText: string
}

const sidebarMenu: ReadonlyArray<TMenuButtonProps> = [
    {
        label: 'Home',
        Icon: ({ className }) => <HomeIcon className={className} />,
        href: '/',
        tooltipText: '',
    },
    {
        label: 'Library',
        Icon: ({ className }) => <LibraryIcon className={className} />,
        href: '/repository',
        tooltipText: '',
    },
    {
        label: 'Search History',
        Icon: ({ className }) => <HistoryIcon className={className} />,
        href: '/chat-history',
        tooltipText: '',
    },
    {
        label: 'Sync your Files',
        Icon: ({ className }) => <UploadIcon className={className} />,
        href: '/sync',
        tooltipText:
            'Enhance your queries by syncing your cloud accounts like Google Drive and Dropbox',
    },
    {
        label: 'Volume Checks',
        Icon: ({ className }) => <TwoChecksIcon className={className} />,
        href: '/volume',
        tooltipText: '',
    },
]

export const MenuButton = (props: TMenuButtonProps) => {
    const { label, href, Icon } = props
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    const { showSidebar } = useContext(SidebarContext)
    const [isLoggedIn] = useAuthStore(state => [state.isLoggedIn])

    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <>
            <Link
                href={href}
                onClick={() => {
                    if (href !== '/' && href !== '/login' && !isLoggedIn) setShowModal(true)
                }}
            >
                <div className="flex-start group flex gap-2 py-[12px] pr-[12px] sm:py-[8px]">
                    <Image
                        src="/assets/icons/caret-right.svg"
                        alt="caret right"
                        width={17}
                        height={20}
                        className={`opacity-0 transition group-hover:opacity-100 ${
                            isActive && 'opacity-100'
                        }`}
                    />
                    <div
                        className={twJoin(
                            'flex items-center gap-3',
                            'duration-500',
                            !showSidebar && 'gap-x-8 px-2',
                        )}
                    >
                        <div>
                            <Icon
                                className={twMerge(
                                    'stroke-white transition group-hover:stroke-primary-600',
                                    isActive && 'stroke-primary-600',
                                )}
                            />
                        </div>
                        <div
                            className={twMerge(
                                'flex gap-2 whitespace-nowrap align-middle text-white transition group-hover:text-primary-600',
                                isActive && 'text-primary-600',
                            )}
                        >
                            {label}
                            {/* {href === '/sync' && (
                                <div className="group relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="text-white">
                                            Enhance your queries by syncing files from your cloud
                                            accounts like Google Drive and Dropbox
                                        </span>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </Link>
            <WaitlistModal showModal={showModal} onClose={closeModal} />
        </>
    )
}

export const SidebarMenu = () => {
    return (
        <div className="flex max-h-[300px] flex-1 flex-col gap-[5px] overflow-hidden overflow-y-auto">
            {sidebarMenu.map(menu => (
                <WithTooltip key={menu.label} tooltipText={menu.tooltipText} placement="right">
                    <MenuButton {...menu} />
                </WithTooltip>
            ))}
        </div>
    )
}

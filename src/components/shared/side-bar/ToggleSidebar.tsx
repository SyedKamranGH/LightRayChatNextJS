import Image from 'next/image'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { SidebarContext } from '@/components/shared'
import { useScreenSize } from '@/hooks/useScreenSize'

export const ToggleSidebar = ({ className = '' }) => {
    const { isMobile } = useScreenSize()
    const { showSidebar, setShowSidebar } = useContext(SidebarContext)

    if (isMobile) {
        return (
            <button
                className={twMerge(
                    'w-fit rounded-lg p-2 text-white transition hover:bg-primary/30',
                    className,
                )}
                onClick={() => setShowSidebar(prev => !prev)}
            >
                <Image
                    src="/assets/icons/hamburger.svg"
                    alt="sidebar button"
                    width={24}
                    height={24}
                />
            </button>
        )
    }
    return (
        <button
            className={twMerge(
                'w-fit rounded-lg p-2 text-black hover:bg-primary/30',
                !showSidebar && 'rotate-180',
                className,
            )}
            onClick={() => setShowSidebar(prev => !prev)}
        >
            <Image
                src="/assets/icons/sidebar-button.svg"
                alt="sidebar button"
                width={24}
                height={24}
            />
        </button>
    )
}

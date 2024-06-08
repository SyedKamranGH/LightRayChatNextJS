import Link from 'next/link'
import { useContext } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

import { SidebarContext } from '../Layout'
import { ToggleSidebar } from './ToggleSidebar'
import { LogoIcon } from '../icons/LogoIcon'

export const SidebarHeader = () => {
    const { showSidebar } = useContext(SidebarContext)

    return (
        <div className="mb-4 flex h-auto flex-col overflow-hidden">
            <div
                className={twMerge(
                    'flex flex-col justify-items-start gap-y-[30px]',
                    !showSidebar && 'px-1',
                )}
            >
                {/* Branding */}
                <div className="flex">
                    <Link
                        href="/"
                        className={twJoin(
                            'flex flex-1 cursor-pointer justify-start duration-500',
                            !showSidebar && 'justify-start',
                        )}
                    >
                        <LogoIcon
                            className={twMerge(
                                'h-24 w-48 duration-500',
                                !showSidebar && 'h-8 w-20',
                            )}
                        />
                    </Link>

                    {/* Hide ToggleSidebar */}
                    {/* <div
                        className={twJoin(
                            'flex flex-col justify-center duration-500',
                            !showSidebar && 'scale-0',
                        )}
                    >
                        <ToggleSidebar />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

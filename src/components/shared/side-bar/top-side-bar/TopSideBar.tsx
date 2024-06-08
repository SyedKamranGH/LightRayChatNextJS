import Link from 'next/link'

import { Logo, SidebarContext } from '@/components/shared'
import { SidenavIcon } from '@/components/shared/icons'
import { useContext } from 'react'

export const TopSideBar = () => {
    const { setShowSidebar } = useContext(SidebarContext)

    return (
        <div className="flex min-h-fit flex-col overflow-hidden">
            <div className="flex flex-col justify-items-start gap-y-2 px-4">
                <Link href="/" className="cursor-pointer py-4">
                    <Logo iconStyle="h-9 w-9" />
                </Link>
                <div onClick={() => setShowSidebar(prev => !prev)}>
                    <SidenavIcon onClick={() => setShowSidebar(prev => !prev)} />
                </div>
            </div>
        </div>
    )
}

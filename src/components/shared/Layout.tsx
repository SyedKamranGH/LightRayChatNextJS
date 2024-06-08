import { createContext, useState } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'

import { useScreenSize } from '@/hooks/useScreenSize'

import { Sidebar } from './side-bar'
import { Logo } from './logo'
import { ToggleSidebar } from './side-bar/ToggleSidebar'
import { UserProfileButton } from './side-bar/UserProfileButton'
import { useAuthStore } from '@/store/auth-store'

export const SidebarContext = createContext<{
    showSidebar: boolean
    setShowSidebar: Dispatch<SetStateAction<boolean>>
}>({
    showSidebar: true,
    setShowSidebar: () => null,
})

export const Layout = ({ children }: { children: ReactNode }) => {
    const { isMobile } = useScreenSize()
    const [isLoggedIn, user] = useAuthStore(state => [state.isLoggedIn, state.user])

    return (
        <div className="flex h-[100dvh] w-[100dvw] bg-white">
            <div className="flex h-full w-full flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex h-full w-full flex-col">
                    {isMobile && (
                        <nav className="flex-between bg-black px-[15px] py-[2px]">
                            <ToggleSidebar />
                            <Logo iconStyle="h-10 w-20" />
                            <UserProfileButton
                                name={user.name}
                                className={!isLoggedIn ? 'invisible' : ''}
                            />
                        </nav>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}

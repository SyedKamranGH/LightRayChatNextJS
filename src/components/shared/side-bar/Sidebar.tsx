import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect } from 'react'
import { twJoin } from 'tailwind-merge'

import { SidebarContext } from '@/components/shared'
import { CloseIcon } from '@/components/shared/icons'
import { useScreenSize } from '@/hooks/useScreenSize'

import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarMenu } from './SidebarMenu'
import { TryEnterprise } from './TryEnterprise'
import { useAuthStore } from '@/store/auth-store'
import { SidebarMenuGuest } from './SidebarMenuGuest'

export const Sidebar = () => {
    const router = useRouter()
    const { isMobile } = useScreenSize()
    const { showSidebar, setShowSidebar } = useContext(SidebarContext)
    const toggleSidebar = () => setShowSidebar(prev => !prev)

    const { user, isLoggedIn, logout } = useAuthStore(state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        logout: state.clearAuth,
    }))

    useEffect(() => {
        // Close sidebar after action on mobile
        if (isMobile && showSidebar) setShowSidebar(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, router.pathname])

    if (isMobile) {
        return (
            <Transition.Root as={Fragment} show={showSidebar}>
                <div
                    className="relative z-50"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-300 ease-in-out"
                        enterFrom="bg-opacity-0"
                        enterTo="bg-opacity-75"
                        leave="transition duration-300 ease-in-out"
                        leaveFrom="bg-opacity-75"
                        leaveTo="bg-opacity-0"
                    >
                        <div className="fixed inset-0 flex overflow-hidden bg-[#7A7A7A]">
                            <Transition.Child
                                as={Fragment}
                                enter="transition duration-150 ease-in-out"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition duration-150 ease-in-out"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <div className="relative flex h-full w-full max-w-xs flex-1 flex-col">
                                    <section className="relative flex h-full w-full max-w-xs translate-x-0 flex-col justify-between overflow-hidden bg-black py-5">
                                        <SidebarHeader />
                                        <SidebarMenu />
                                        <SidebarFooter />
                                    </section>
                                    <div className="absolute -right-2 top-0 -mr-12 pt-2 opacity-100">
                                        <button
                                            type="button"
                                            className={twJoin(
                                                'flex h-12 w-12 items-center justify-center rounded-lg text-black hover:bg-[#cadaef]',
                                                'transition duration-150 ease-in-out',
                                                showSidebar ? 'scale-100' : 'scale-0',
                                            )}
                                            tabIndex={0}
                                            onClick={toggleSidebar}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <CloseIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Transition.Child>
                </div>
            </Transition.Root>
        )
    }

    return (
        <section
            className={twJoin(
                // format
                'flex h-[100dvh] w-[320px] flex-col overflow-hidden bg-black pt-[30px]',
                // animation
                'duration-300',
                showSidebar ? 'max-w-full' : 'max-w-[5.6rem]',
            )}
        >

            <div className='flex flex-col h-[100dvh]'>
                <div>
                    <SidebarHeader />
                </div>
                <div className='grow'>
                    {isLoggedIn ? <SidebarMenu /> : <SidebarMenuGuest />}
                </div>
                <div className="mb-3">
                    <TryEnterprise />
                </div>
                {isLoggedIn && (
                    <div className="bottom-0 w-[260px]">
                        <div className="mb-3 h-0 w-full border border-[#a8aaae60]" />
                        <SidebarFooter />
                    </div>
                )}
            </div>

        </section>
    )
}

import { Menu } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, type ReactNode } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { RxCopy } from 'react-icons/rx'
import { twJoin, twMerge } from 'tailwind-merge'

import { MeatballsIcon } from '@/components/shared/icons'
import { useAuthStore } from '@/store/auth-store'
import { SidebarContext } from '..'
import { ToggleSidebar } from './ToggleSidebar'
import { UserProfileButton } from './UserProfileButton'

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div className="relative h-auto w-full overflow-hidden px-4 md:pb-[30px]">
        <div className="flex-between h-[56px] w-full rounded-[5px] border border-[#DCDCDC] bg-white">
            {children}
        </div>
    </div>
)

export const SidebarFooter = () => {
    const router = useRouter()

    // TODO: Replace with NextAuth
    const { user, isLoggedIn, logout } = useAuthStore(state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        logout: state.clearAuth,
    }))

    const { showSidebar } = useContext(SidebarContext)

    // Not logged in
    if (!isLoggedIn && showSidebar)
        return (
            <Wrapper>
                <div
                    className={twMerge(
                        'body-light mx-auto flex gap-4 px-4',
                        !showSidebar && 'hidden',
                    )}
                >
                    <Link href="/login" className="font-medium underline">
                        Log in
                    </Link>
                    |
                    <Link href="/signup" className="font-medium underline">
                        Sign up
                    </Link>
                </div>
            </Wrapper>
        )

    if (!isLoggedIn && !showSidebar)
        return (
            <div className="flex-center relative h-auto w-full flex-col gap-4 overflow-hidden px-4 md:pb-20">
                <ToggleSidebar />
                <Link
                    href="/login"
                    className={twMerge(
                        // 'w-6 rounded-full bg-[#efefef] p-6',
                        showSidebar && 'hidden',
                    )}
                >
                    <Image
                        src="/assets/icons/user-profile.svg"
                        alt="User Profile"
                        height={34}
                        width={34}
                    />
                </Link>
            </div>
        )

    return (
        <div className="relative h-auto w-auto flex-col">
            <ToggleSidebar
                className={twJoin(
                    'absolute left-0 top-0 -translate-y-full p-4',
                    showSidebar && 'scale-0',
                )}
            />

            <Menu>
                <Menu.Items
                    as="ul"
                    className="absolute ml-1 flex w-full -translate-y-full flex-col bg-black px-2 py-4"
                >
                    <Menu.Item>
                        <li
                            className={twMerge(
                                'flex-between mx-auto flex w-full cursor-pointer gap-2 rounded-md bg-gray-800 p-3',
                                !showSidebar && 'justify-center',
                            )}
                            onClick={() => {
                                router.replace('/')
                                logout()
                            }}
                        >
                            {showSidebar && <p className="text-gray-300">Logout</p>}
                            <FiLogOut className="text-white" />
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li
                            className={twMerge(
                                'flex-between mx-auto mt-1 flex w-full cursor-pointer gap-5 rounded-md bg-gray-800 p-3',
                                !showSidebar && 'justify-center',
                            )}
                            onClick={() => {
                                router.replace('/')
                            }}
                        >
                            {showSidebar && <p className="text-gray-300">Settings</p>}
                            <FiSettings className="text-white" />
                        </li>
                    </Menu.Item>
                </Menu.Items>
                <Menu.Button
                    className={twJoin(
                        'flex-between h-[56px] w-full gap-2',
                        'ui-open:rounded-t-none ui-open:border-primary-900 ui-open:bg-primary-900',
                    )}
                >
                    <div
                        className={twJoin(
                            'flex-between h-[56px] w-full gap-2 pb-[25px] pl-[30px]',
                            'ui-open:rounded-t-none ui-open:border-primary-700',
                        )}
                    >
                        <UserProfileButton name={user.name} />
                        <div className="ml-1 line-clamp-1 flex flex-1 flex-col items-start ui-open:text-white">
                            <p className="body-regular w-full truncate whitespace-nowrap text-left text-white">
                                {user.name}
                            </p>
                        </div>
                        <MeatballsIcon
                            className={twMerge(
                                'h-6 w-6 shrink-0 rotate-90 duration-500 ui-open:fill-white ui-open:stroke-white',
                            )}
                        />
                    </div>

                    {/* TODO: Create a drop-up menu to provide options to users */}
                </Menu.Button>
            </Menu>

            {user.role === 'ADMIN' && (
                <div className="flex justify-center gap-2 pt-4 md:h-20">
                    {showSidebar && <p className="py-1 text-xs text-white">Referral Code:</p>}
                    <button
                        className="flex h-fit gap-2 rounded-sm px-2 py-1 text-primary-700 transition hover:bg-slate-200"
                        onClick={() => {
                            // TODO: Switch this back on once LightRay production is deployed with https
                            // navigator.clipboard.writeText(user.referralCode)

                            const textField = document.createElement('textarea')
                            textField.innerText = user.referralCode
                            document.body.appendChild(textField)
                            textField.select()
                            document.execCommand('copy')
                            textField.remove()
                        }}
                    >
                        <p className="text-xs">{user.referralCode}</p>
                        <RxCopy />
                    </button>
                </div>
            )}
        </div>
    )
}

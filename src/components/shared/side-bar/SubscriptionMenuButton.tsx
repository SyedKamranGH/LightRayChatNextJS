import Link from 'next/link'
import { MdOutlineArrowOutward } from 'react-icons/md'
import { useAuthStore } from '@/store/auth-store'
import { useContext } from 'react'
import { SidebarContext } from '..'

export const SubscriptionMenuButton = () => {
    const { showSidebar } = useContext(SidebarContext)
    const { user } = useAuthStore(state => ({
        user: state.user,
    }))

    if (process.env.NEXT_PUBLIC_PAYMENT_ENABLED === 'false') {
        return null
    }

    const planName = `${user.subscribedPlan?.toLowerCase()} Plan`

    if (!showSidebar) {
        return (
            <div className="flex flex-col items-center gap-2">
                <div className="my-auto flex h-10 w-10 justify-center rounded-full bg-gray-200 p-2 align-middle">
                    💎
                </div>
                <Link href="/subscription" className="text-center text-xs font-semibold capitalize">
                    {user.subscribedPlan ? planName : 'Upgrade Plan'}
                </Link>
            </div>
        )
    }

    if (!user.subscribedPlan || !user.subscriptionExpirationDate) {
        return (
            <div className="flex flex-col gap-2">
                <div className="font-bold capitalize">💎 Upgrade Plan</div>
                <div>Unlock endless possibilities with pints.ai</div>
                <ExplorePlanButton />
            </div>
        )
    }

    if (new Date(user.subscriptionExpirationDate) < new Date()) {
        return (
            <div className="flex flex-col gap-2">
                <div className="font-bold capitalize">💎 Resume Plan</div>
                <div>Unlock endless possibilities with pints.ai</div>
                <ExplorePlanButton />
            </div>
        )
    }

    if (user.subscribedPlan) {
        return (
            <div className="flex flex-col gap-2">
                <div className="font-bold capitalize">
                    💎 {user.subscribedPlan.toLowerCase()} Plan
                </div>
                {showSidebar && (
                    <div>
                        You are currently on the <span className="capitalize">{planName}.</span>
                    </div>
                )}
                {showSidebar && <ExplorePlanButton />}
            </div>
        )
    }
}

const ExplorePlanButton = () => (
    <Link href={'/subscription'}>
        <div className="flex w-fit items-center rounded-md bg-white px-2">
            Explore Plans <MdOutlineArrowOutward className="ml-2" size="18" />
        </div>
    </Link>
)

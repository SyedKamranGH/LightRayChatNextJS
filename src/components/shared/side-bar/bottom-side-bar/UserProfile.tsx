import { FiLogOut } from 'react-icons/fi'

import { UserIcon } from '@/components/shared/icons'
import { useAuthStore } from '@/store/auth-store'

export const UserProfile = () => {
    const [user, logout] = useAuthStore(state => [state.user, state.clearAuth])

    return (
        <div
            className="flex h-11 cursor-pointer items-center justify-between space-x-3 rounded-lg px-2 text-lg text-primary hover:bg-secondary/20"
            onClick={logout}
        >
            <div className="flex gap-x-2">
                <UserIcon className="stroke-primary" />
                <p>{user.name}</p>
            </div>
            <FiLogOut />
        </div>
    )
}

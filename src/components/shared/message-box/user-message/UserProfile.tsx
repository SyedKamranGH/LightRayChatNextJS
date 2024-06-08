import { shallow } from 'zustand/shallow'

import { useAuthStore } from '@/store/auth-store'

export const UserProfile = () => {
    const user = useAuthStore(state => state.user, shallow)

    const initial =
        typeof user.name === 'string' && user.name.length > 2
            ? user.name.slice(0, 2).toUpperCase()
            : user.name

    return (
        <div className="body-regular md:paragraph-regular flex items-center gap-[10px]">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-md bg-primary-700">
                <p className="text-white">{initial}</p>
            </div>
            <p className="font-medium">{user.name}</p>
        </div>
    )
}

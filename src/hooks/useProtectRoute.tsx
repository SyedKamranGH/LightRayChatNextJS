import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuthStore } from '@/store/auth-store'

export const useProtectRoute = () => {
    const [isLoggedIn] = useAuthStore(state => [state.isLoggedIn])
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) router.replace('/')
    }, [isLoggedIn, router])
}

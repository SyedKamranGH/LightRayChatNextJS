import { useEffect } from 'react'

import { useAuthStore } from '@/store/auth-store'
import { getUserProfile } from '@/queries/user'

import { Log } from 'debug-next'

const { log, logError } = Log()

export const useRefreshProfile = () => {
    const [isLoggedIn, setUser] = useAuthStore(state => [state.isLoggedIn, state.setUser])

    useEffect(() => {
        if (isLoggedIn) {
            log(`User is logged in. Refreshing the user profile in background.`)

            getUserProfile
                .queryFn()
                .then(user => setUser(user))
                .catch(error => logError(error))
        }
    }, [isLoggedIn, setUser])
}

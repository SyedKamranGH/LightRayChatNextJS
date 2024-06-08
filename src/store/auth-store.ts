import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Stripe {
    customerId: string
}

export type TUserRole = 'ADMIN' | 'USER'

interface User {
    userId: string
    name: string
    email: string
    referralCode: string
    role: TUserRole
    createdAt: string
    updatedAt: string
    stripe?: Stripe
    subscriptionExpirationDate?: Date
    subscribedPlan?: string
}

type State = {
    user: User
    accessToken: string | null
    isLoggedIn: boolean
}

type Action = {
    setUser: (user: User) => void
    setAccessToken: (accessToken: string) => void
    clearAuth: () => void
}

const initialState: State = {
    user: {} as User,
    accessToken: null,
    isLoggedIn: false,
}

export const useAuthStore = create<State & Action>()(
    persist(
        set => {
            return Object.assign(initialState, {
                setUser: (user: User) => set({ user }),
                setAccessToken: (accessToken: string) =>
                    set({ accessToken, isLoggedIn: !!accessToken }),
                clearAuth: () => set(initialState),
            })
        },
        {
            name: 'authentication',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

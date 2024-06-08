import { TUserRole } from '@/store/auth-store'
import axiosInstance from '@/utils/axios'
import axios from 'axios'

interface IUserSignInResponse {
    user: {
        name: string
        email: string

        role: TUserRole
        referralCode: string

        userId: string
        createdAt: string
        updatedAt: string
        confirmed: boolean
    }

    accessToken: string
}

export const signInUser = Object.freeze({
    mutationKey: `/public/signin`,
    mutationFn: async (email: string, password: string): Promise<IUserSignInResponse> => {
        const response = await axios.post<IUserSignInResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/public/signin`,
            { email, password },
            // We need to save the cookies in the browser that API server sends back.
            // As we are using cross sites (different domains) for API server and frontend,
            // we need to withCredentials to true so that `axios` can automatically save the cookies.
            // The same applies for `signup` route.
            // Ref - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
        )

        return response.data
    },
})

interface IUserSignUpResponse {
    user: {
        name: string
        email: string
        confirmed: boolean

        userId: string
        createdAt: string
        updatedAt: string
    }
}

export const signUpUser = Object.freeze({
    mutationKey: `/public/signup`,
    mutationFn: async (payload: {
        name: string
        email: string
        password: string
        referralCode: string
    }): Promise<IUserSignUpResponse> => {
        const { name, email, password, referralCode } = payload

        const response = await axios.post<IUserSignUpResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/public/signup`,
            { name, email, password, referralCode: referralCode === '' ? undefined : referralCode },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
        )

        return response.data
    },
})

export interface IEmailConfirmationResponse {
    user: {
        name: string
        email: string
        confirmed: boolean

        role: TUserRole
        referralCode: string

        userId: string
        createdAt: string
        updatedAt: string
    }

    accessToken: string
}

interface Stripe {
    customerId: string
}

interface IGetUserProfileResponse {
    userId: string
    confirmed: boolean

    name: string
    email: string

    role: TUserRole
    referralCode: string

    createdAt: string
    updatedAt: string

    stripe: Stripe
    subscriptionExpirationDate: Date
    subscribedPlan: string
}

export const getUserProfile = Object.freeze({
    queryKey: `/v1/users/profile`,
    queryFn: async (): Promise<IGetUserProfileResponse> => {
        const response = await axiosInstance.get<{ result: IGetUserProfileResponse }>(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/users/profile`,
        )

        return response.data.result
    },
})

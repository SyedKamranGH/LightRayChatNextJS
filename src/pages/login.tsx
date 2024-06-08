import axios from 'axios'
import Link from 'next/link'

import { shallow } from 'zustand/shallow'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { signInUser } from '@/queries/user'
import { Logo } from '@/components/shared'
import { useAuthStore } from '@/store/auth-store'

const Login = () => {
    const router = useRouter()
    const [setUser, setAccessToken] = useAuthStore(
        state => [state.setUser, state.setAccessToken],
        shallow,
    )

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            const response = await signInUser.mutationFn(email, password)

            // User has not verified email OTP yet
            if (response.user.confirmed === false) {
                router.push(`/otp-confirmation?email=${response.user.email}`)
                return
            }

            setUser(response.user)
            setAccessToken(response.accessToken)

            router.replace('/')
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message)
                return
            }

            if (axios.isAxiosError(err) && err.code === 'ERR_NETWORK') {
                setError('Network error. Please try again later!')
                return
            }

            setError('An error occurred while logging in.')
        }
    }

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex h-full items-center justify-center md:w-1/2">
                <div className="mx flex flex-col p-8 md:w-1/2">
                    <h1 className="mb-2 text-4xl font-medium">Welcome Back</h1>
                    <p className="text-base text-gray-500">
                        Welcome back! Please enter your details.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
                        {error && error.length > 0 && (
                            <p className="font-normal text-red-500">{error}</p>
                        )}

                        <div className="mb-4 mt-5">
                            <label htmlFor="email" className="mb-2 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full rounded-lg border-2 p-2"
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full rounded-lg border-2 p-2"
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mt-1 flex w-full justify-end">
                            <Link href="/forgot-password" className="font-medium underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-full rounded-md bg-black p-2 text-white"
                        >
                            Sign in
                        </button>

                        <div className="mt-6 flex w-full justify-between self-center text-sm">
                            <p>
                                Don{"'"}t have an account?{' '}
                                <Link href="/signup" className="text-primary-700">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden flex-col justify-center bg-secondary/30 md:flex md:w-1/2 md:bg-black">
                <Logo iconStyle="w-60 h-60" />
            </div>
        </div>
    )
}

export default Login

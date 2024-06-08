/* eslint-disable prettier/prettier */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import { Button, Logo } from '@/components/shared'
import { TPasswordResetFormState, resetPassword } from '@/lib/action/auth'

import { ResetPassword } from '@/components/pages/forget-password/ResetPassword'
import { VerifyEmail } from '@/components/pages/forget-password/VerifyEmail'
import { VerifyOtp } from '@/components/pages/forget-password/VerifyOTP'

export default function ForgotPasswordPage() {
    const [state, formAction] = useFormState<TPasswordResetFormState, FormData>(resetPassword, {
        step: 'VERIFY_EMAIL',
        data: {},
    })

    return (
        <div className="flex min-h-screen flex-col sm:justify-between">
            {/* Brand Section */}
            <header className="mb-10 mt-4 sm:mb-0 sm:mt-10">
                <Link href="/">
                    <Logo iconStyle="h-[35px] w-[35px]" />
                </Link>
            </header>

            <main>
                <section className="mx-auto max-w-2xl px-2">
                    <VerifyEmail
                        className={twMerge(
                            state.step === 'VERIFY_EMAIL'
                                ? 'block animate-fadeInLeft'
                                : 'hidden animate-fadeOutLeft',
                        )}
                        formState={state}
                        formAction={formAction}
                    />

                    <VerifyOtp
                        className={twMerge(
                            state.step === 'VERIFY_OTP'
                                ? 'block animate-fadeInLeft'
                                : 'hidden animate-fadeOutLeft',
                        )}
                        formState={state}
                        formAction={formAction}
                    />

                    <ResetPassword
                        className={twMerge(
                            state.step === 'RESET_PASSWORD'
                                ? 'block animate-fadeInLeft'
                                : 'hidden animate-fadeOutLeft',
                        )}
                        formState={state}
                        formAction={formAction}
                    />

                    <div
                        className={twMerge(
                            'hidden',
                            state.step === 'DONE' && 'flex animate-fadeInUp flex-col items-center',
                        )}
                    >
                        <Image
                            src="/image/high-five.png"
                            width={300}
                            height={300}
                            alt="High Five"
                        />

                        <header>
                            <h1 className="h4-medium sm:h1-medium text-center font-medium">
                                Successfully Reset Password!
                            </h1>
                            <p className="paragraph-regular mt-5 text-center">
                                You can now use your new password to log in to your account.
                            </p>
                        </header>

                        <Link href="/login">
                            <Button
                                variant="primary"
                                className="mt-[70px] h-[45px] w-[300px] rounded-md"
                            >
                                Log In
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Empty element to style the section */}
            <footer className="h-4 sm:h-10" />
        </div>
    )
}

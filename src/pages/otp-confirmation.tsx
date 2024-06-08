import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from '@/store/auth-store'
import { Button, Logo } from '@/components/shared'
import { IEmailConfirmationResponse } from '@/queries/user'

import { LoadingIcon } from '@/components/shared/icons'
import Link from 'next/link'

const OTP_LENGTH = 6
const DIGIT_REGEX = new RegExp(/^\d+$/)
const RESEND_OTP_BUFFER = 20

type TConfirmationPayload = {
    email: string
    OTP: string
}

type TResendPayload = {
    email: string
}

const OTPConfirmation = () => {
    const router = useRouter()

    const email = router.query.email as string

    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(RESEND_OTP_BUFFER)

    const [setUser, setAccessToken] = useAuthStore(state => [state.setUser, state.setAccessToken])

    const confirmationMutate = useMutation({
        mutationFn: async (confirmationPayload: TConfirmationPayload) => {
            const response = await axios.post<{ result: IEmailConfirmationResponse }>(
                '/api/auth/confirmation',
                confirmationPayload,
            )
            return response.data.result
        },
        onError() {
            setOtp('')
        },
        onSuccess(data) {
            const { user, accessToken } = data
            setUser(user)
            setAccessToken(accessToken)

            router.replace('/confirmation-success')
        },
    })

    const resendMutate = useMutation({
        mutationFn: (ResendPayload: TResendPayload) => {
            return axios.post('/api/auth/resend', ResendPayload)
        },
    })

    const onChangeOTP = (value: string) => setOtp(value)

    const otpInputs = useMemo(() => {
        // [1,2,3]
        const valueArray = otp.split('')
        const otpArray: string[] = []

        // constructing otpArray to have length otpLength
        for (let i = 0; i < OTP_LENGTH; i++) {
            const char = valueArray[i]

            if (DIGIT_REGEX.test(char)) {
                otpArray.push(char)
            } else {
                otpArray.push('')
            }
        }
        return otpArray
    }, [otp])

    const focusToNextInput = (target: HTMLInputElement) => {
        const nextElementSibling = target.nextElementSibling as HTMLInputElement | null

        if (nextElementSibling) {
            nextElementSibling.focus()
        }
    }

    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling = target.previousElementSibling as HTMLInputElement | null

        if (previousElementSibling) {
            previousElementSibling.focus()
        }
    }

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const target = e.target
        // trim white spaces to improve UX if users unintentionally copy white spaces
        let targetValue = target.value.trim()

        const isTargetValueDigit = DIGIT_REGEX.test(targetValue)

        // prevent focus on next input box if deleting
        if (!isTargetValueDigit && targetValue !== '') {
            return
        }

        const nextInputEl = target.nextElementSibling as HTMLInputElement | null

        // only delete digit if next input element has no value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return
        }

        targetValue = isTargetValueDigit ? targetValue : ' '

        const targetValueLength = targetValue.length

        if (targetValueLength === 1) {
            // constructing new otp
            const newValue = otp.substring(0, idx) + targetValue + otp.substring(idx + 1)

            onChangeOTP(newValue)

            if (!isTargetValueDigit) {
                return
            }

            focusToNextInput(target)
        } else if (targetValueLength === OTP_LENGTH) {
            // logic for allowing pasting of OTP
            onChangeOTP(targetValue)

            // unfocus the inputs, improves mobile UI as unfocusing the inputs will hide keyboard
            target.blur()
        }
    }

    // logic to use arrow keys and allow deleting from input boxes
    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e
        const target = e.target as HTMLInputElement

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault()
            return focusToNextInput(target)
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault()
            return focusToPrevInput(target)
        }

        const targetValue = target.value

        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length)

        if (e.key !== 'Backspace' || targetValue !== '') {
            return
        }

        focusToPrevInput(target)
    }

    // ensures the whole input box is selected, if cursor in left or right of field it behave unexpectedly because the current digit is not replaced.
    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e

        // keep focusing back until previous input
        // element has value
        const prevInputEl = target.previousElementSibling as HTMLInputElement | null

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus()
        }

        target.setSelectionRange(0, target.value.length)
    }

    const handleResend = () => {
        resendMutate.mutate({ email })
        setSeconds(RESEND_OTP_BUFFER)
    }

    // resend OTP timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) setSeconds(seconds - 1)
            if (seconds === 0) clearInterval(interval)
        }, 1000)

        return () => clearInterval(interval)
    }, [seconds])

    useEffect(() => {
        if (
            !confirmationMutate.isLoading &&
            !confirmationMutate.isSuccess &&
            otp.length === OTP_LENGTH
        ) {
            confirmationMutate.mutate({ email: email, OTP: otp })
        }
    }, [otp, confirmationMutate, email])

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex h-full items-center justify-center md:w-1/2">
                <div className="w-3/5 space-y-4 shadow-lg p-10">
                    <h4 className="text-2xl sm:text-2xl">Verify your email address ✉️</h4>

                    {confirmationMutate.isLoading || confirmationMutate.isSuccess ? (
                        <>
                            <p className="text-xs [text-wrap:balance] sm:text-sm">
                                Please wait a moment while we ensure the security and authenticity of
                                your email address.
                            </p>

                            {/* TODO :: revamp the loader to match the loading indicator from Figma */}
                            <LoadingIcon className="mx-auto h-10 w-10 text-primary-700" />
                        </>
                    ) : (
                        <>
                            <p className="text-xs [text-wrap:balance] sm:text-sm">
                                We have sent a verfication code to
                                <span className="text-primary-700"> {email}hello@example.com</span> to confirm your
                                account. Please enter the code below.
                            </p>

                            <div className="space-x-2 text-center">
                                {otpInputs.map((digit, idx) => {
                                    return (
                                        /*
                                            used type=text instead of number because numbers input type come with the (although can be removed),
                                            and are normally used for incremental values and working with quantity (which is not the case here)

                                            inputMode=numeric suggests to the browser that it should display a numeric keyboard layout on touch devices

                                            one-time-code allows autocomplete on ios devices

                                            pattern has a regex to allow 1 digit per input box

                                            maxLength not set to 1 (even though it might be intuitive at first to allow for pasting of OTPs
                                        */
                                        <input
                                            key={idx}
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            pattern="\d{1}"
                                            maxLength={OTP_LENGTH}
                                            className={twMerge(
                                                // 'h-10 w-10 border-b-2 text-center text-primary-700 focus:outline-none',
                                                'h-10 w-11 p-4 border border-gray-300 rounded-md focus:outline-none',
                                                otpInputs[idx] !== '' && 'border-b-primary-700',
                                            )}
                                            style={{backgroundColor:"#cbccce"}}
                                            value={digit}
                                            autoFocus={idx === 0}
                                            onChange={e => inputOnChange(e, idx)}
                                            onKeyDown={inputOnKeyDown}
                                            onFocus={inputOnFocus}
                                        />
                                    )
                                })}
                            </div>
                            <Button
                                variant="danger"
                                style={{backgroundColor:"#dc3534", width:"100%"}}
                                className="rounded-md"
                            >
                                Submit
                            </Button>

                            {confirmationMutate.isError && (
                                <div className="text-error">OTP is incorrect or has expired</div>
                            )}

                            <div className="flex flex-col items-center justify-between gap-y-1 text-xs">
                                <p className="text-xs [text-wrap:balance] sm:text-sm">
                                    Didn't get the mail? <button style={{color:"#dc3534"}} onClick={handleResend}>Resend</button>
                                </p>

                                <button></button>

                                {/* <Button
                                    className="px-3 py-1"
                                    variant={seconds !== 0 ? 'disabled' : 'default'}
                                    aria-disabled={seconds !== 0}
                                    onClick={handleResend}
                                >
                                    Request to resend code again. {seconds > 0 && `(${seconds}s)`}
                                </Button> */}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="hidden flex-col justify-center bg-secondary/30 md:flex md:w-1/2 md:bg-black">
                <Logo iconStyle="w-60 h-60" />
            </div>
        {/* <div className="mx-auto flex h-screen max-w-3xl flex-col gap-y-5 p-12 text-center sm:px-32 ">
            <div className="basis-1/3">
                <Logo iconStyle="w-8" />
            </div>
        </div> */}
        </div>
    )
}

export default OTPConfirmation

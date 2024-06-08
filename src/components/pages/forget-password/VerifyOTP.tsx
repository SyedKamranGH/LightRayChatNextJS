import { useEffect, useRef, useState } from 'react'
import OtpInput from 'react-otp-input'
import { FormButton } from './FormButton'
import { TPasswordResetFormState } from '@/lib/action/auth'
import { ErrorMessageAlert } from '@/components/pages/forget-password/ErrorMessage'

export const VerifyOtp = (props: {
    className: string
    formState: TPasswordResetFormState
    formAction: (payload: FormData) => void
}) => {
    const { className, formState, formAction } = props
    const [otp, setOtp] = useState('')

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (otp.length === 6 && formRef.current) {
            formRef.current.requestSubmit()
        }
    }, [otp])

    return (
        <div className={className}>
            <header>
                <h1 className="h4-medium sm:h1-medium font-medium sm:text-center">
                    Type Password Reset Code
                </h1>
                <p className="paragraph-regular mt-5 sm:text-center">
                    Please type a 6 Digit Code sent to {formState.data.email || 'your email.'}.
                </p>
            </header>

            {/* Verify OTP form */}
            <form ref={formRef} action={formAction} className="mt-[30px] sm:mx-auto sm:max-w-xs">
                <input type="hidden" name="step" value="VERIFY_OTP" />

                <ErrorMessageAlert errorMessage={formState.error?.message} />

                <div className="h-[60px]">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={props => (
                            <input
                                {...props}
                                name="otp[]"
                                inputMode="numeric"
                                pattern="\d{1}"
                                required
                                className="focus-visible h-[50px] w-[calc(15%-8px)] flex-1 border-b-[1.5px] border-[#DEDEDE] bg-transparent text-center outline-primary-700 valid:border-primary-700 focus:border-primary-700 sm:w-[50px]"
                            />
                        )}
                        containerStyle="flex justify-center gap-2"
                        skipDefaultStyles
                    />
                </div>

                <FormButton text="Confirm OTP" />
            </form>
        </div>
    )
}

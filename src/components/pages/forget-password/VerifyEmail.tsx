import { FormButton } from './FormButton'
import { TPasswordResetFormState } from '@/lib/action/auth'
import { ErrorMessageAlert } from '@/components/pages/forget-password/ErrorMessage'

export const VerifyEmail = (props: {
    className: string
    formState: TPasswordResetFormState
    formAction: (payload: FormData) => void
}) => {
    const { className, formState, formAction } = props

    return (
        <div className={className}>
            {/* Heading */}
            <header>
                <h1 className="h4-medium sm:h1-medium font-medium sm:text-center">
                    Forgot Password?
                </h1>
                <p className="paragraph-regular mt-5 sm:text-center">
                    Please enter email address associated your account to sent the password rest
                    code.
                </p>
            </header>

            {/* Verify Email form */}
            <form action={formAction} className="mt-[30px] sm:mx-auto sm:max-w-xs">
                <ErrorMessageAlert errorMessage={formState.error?.message} />
                <input type="hidden" name="step" value="VERIFY_EMAIL" />
                <div>
                    <label htmlFor="email" className="paragraph-regular block">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="body-regular mt-[15px] w-full rounded-md border-2 border-grey-300 py-[12px] pl-[20px] placeholder:text-[#9F9F9F]"
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <FormButton text="Send Code" />
            </form>
        </div>
    )
}

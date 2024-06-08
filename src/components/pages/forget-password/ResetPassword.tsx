import { FormButton } from './FormButton'
import { TPasswordResetFormState } from '@/lib/action/auth'
import { ErrorMessageAlert } from '@/components/pages/forget-password/ErrorMessage'

export const ResetPassword = (props: {
    className: string
    formState: TPasswordResetFormState
    formAction: (payload: FormData) => void
}) => {
    const { className, formState, formAction } = props

    return (
        <div className={className}>
            <header>
                <h1 className="h4-medium sm:h1-medium font-medium sm:text-center">
                    Type Password Reset Code
                </h1>
                <p className="paragraph-regular mt-5 sm:text-center">
                    Please enter email address associated your account to sent the password rest
                    code.
                </p>
            </header>

            {/* Change Password form */}
            <form action={formAction} className="mt-[30px] sm:mx-auto sm:max-w-xs">
                <input type="hidden" name="step" value="RESET_PASSWORD" />

                <ErrorMessageAlert errorMessage={formState.error?.message} />

                <label htmlFor="password" className="paragraph-regular block">
                    New Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="body-regular mt-[15px] w-full rounded-md border-2 border-grey-300 py-[12px] pl-[20px] placeholder:text-[#9F9F9F]"
                    required
                    placeholder="Enter your password"
                />

                <label htmlFor="confirm-password" className="paragraph-regular mt-[20px] block">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    name="confirm-passwo"
                    id="confirm-password"
                    className="body-regular mt-[15px] w-full rounded-md border-2 border-grey-300 py-[12px] pl-[20px] placeholder:text-[#9F9F9F]"
                    required
                    placeholder="Re-enter your password"
                />

                <FormButton text="Reset Password" />
            </form>
        </div>
    )
}

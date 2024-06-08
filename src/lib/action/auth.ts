'use server'

import axios from 'axios'
import { z } from 'zod'

export type TStep = 'VERIFY_EMAIL' | 'VERIFY_OTP' | 'RESET_PASSWORD' | 'DONE'
export type TPasswordResetFormState = {
    step: TStep
    data: { passwordResetToken?: string; email?: string }
    error?: { message?: string }
}

const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    passwordResetToken: z.string(),
    newPassword: z.string().min(5).max(20),
})
const emailSchema = resetPasswordSchema.pick({ email: true })
const otpSchema = resetPasswordSchema.pick({ email: true, otp: true })

const apiErrorHandler = (
    e: unknown,
    currentStep: TStep,
    previousFormStateData?: TPasswordResetFormState['data'],
) => {
    if (axios.isAxiosError(e) && e.response?.data.showMessageToClient) {
        return {
            step: currentStep,
            data: previousFormStateData || {},
            error: { message: e.response.data.message },
        }
    }

    return {
        step: currentStep,
        data: previousFormStateData || {},
        error: { message: 'Something went wrong. Please try again!' },
    }
}

export async function resetPassword(
    previousState: TPasswordResetFormState,
    formData: FormData,
): Promise<TPasswordResetFormState> {
    const step = formData.get('step')

    if (step === 'VERIFY_EMAIL') {
        const validatedResult = emailSchema.safeParse({
            email: formData.get('email'),
        })

        if (!validatedResult.success) {
            return {
                step: 'VERIFY_EMAIL',
                data: {},
                error: { message: 'Please provide valid email!' },
            }
        }

        const { email } = validatedResult.data

        try {
            const apiUrl = `${process.env.PINTS_AI_API}/public/forgot-password/send-otp`
            await axios.post(apiUrl, { email })
        } catch (e: unknown) {
            return apiErrorHandler(e, 'VERIFY_EMAIL', previousState.data)
        }

        return {
            step: 'VERIFY_OTP',
            data: { email },
        }
    }

    if (step === 'VERIFY_OTP') {
        const validatedResult = otpSchema.safeParse({
            email: previousState.data.email,
            otp: formData.getAll('otp[]').join(''),
        })

        if (!validatedResult.success) {
            return {
                step: 'VERIFY_OTP',
                data: previousState.data,
                error: { message: 'Please provide a valid OTP!' },
            }
        }

        const { email, otp } = validatedResult.data

        try {
            const apiUrl = `${process.env.PINTS_AI_API}/public/forgot-password/verify-otp`
            const response = await axios.post(apiUrl, { email, otp })

            const passwordResetToken = response.data.result.passwordResetToken

            return {
                step: 'RESET_PASSWORD',
                data: {
                    email,
                    passwordResetToken,
                },
            }
        } catch (e: unknown) {
            return apiErrorHandler(e, 'VERIFY_OTP', previousState.data)
        }
    }

    if (step === 'RESET_PASSWORD') {
        const validationResult = resetPasswordSchema
            .pick({ email: true, passwordResetToken: true, newPassword: true })
            .safeParse({
                email: previousState.data.email,
                passwordResetToken: previousState.data.passwordResetToken,
                newPassword: formData.get('password'),
            })

        if (!validationResult.success) {
            return {
                step: 'RESET_PASSWORD',
                data: {},
                error: { message: 'Please provide a valid password!' },
            }
        }

        const { email, passwordResetToken, newPassword } = validationResult.data

        try {
            const apiUrl = `${process.env.PINTS_AI_API}/public/forgot-password/reset-password`
            await axios.post(apiUrl, {
                email,
                passwordResetToken,
                newPassword,
            })
        } catch (e: unknown) {
            return apiErrorHandler(e, 'RESET_PASSWORD', previousState.data)
        }

        return { step: 'DONE', data: {} }
    }

    return {
        step: 'VERIFY_OTP',
        data: {},
    }
}

'use client'

import { useFormStatus } from 'react-dom'
import { ButtonWithLoader } from '@/components/shared'

export const FormButton = ({ text }: { text: string }) => {
    const { pending } = useFormStatus()

    return (
        <ButtonWithLoader
            isLoading={pending}
            variant="primary"
            type="submit"
            className="mt-[30px] h-[45px] w-full rounded-md"
        >
            {text}
        </ButtonWithLoader>
    )
}

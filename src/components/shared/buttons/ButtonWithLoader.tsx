import { twMerge } from 'tailwind-merge'
import { Button, type TButtonProps } from '.'
import { LoadingIcon } from '../icons'

type TProps = TButtonProps & { isLoading: boolean }

export const ButtonWithLoader = (props: TProps) => {
    const { isLoading, children, className, ...rest } = props

    return (
        <Button className={twMerge('flex gap-x-2', className)} disabled={isLoading} {...rest}>
            {children}

            {/* TODO: Add transition animation */}
            {isLoading && <LoadingIcon className="h-5 w-5" />}
        </Button>
    )
}

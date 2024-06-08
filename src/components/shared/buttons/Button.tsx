import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'primary' | 'passivePrimary' | 'danger' | 'passiveDanger' | 'disabled'
}

export const Button = forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const { className, variant = 'default', children, ...rest } = props

    return (
        <button
            ref={ref}
            className={twMerge(
                'flex items-center justify-center rounded-xl px-6 py-2 text-xs md:text-sm',
                variant === 'default' && 'border text-black hover:border-primary',
                variant === 'primary' && 'bg-black text-white',
                variant === 'passivePrimary' && 'text-primary hover:bg-secondary/60',
                variant === 'danger' && 'bg-error text-white hover:border-error',
                variant === 'passiveDanger' && 'text-error hover:bg-light-error',
                variant === 'disabled' && 'cursor-not-allowed bg-gray-200 text-gray-400',
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

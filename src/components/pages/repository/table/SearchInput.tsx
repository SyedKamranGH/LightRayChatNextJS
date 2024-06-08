import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={twMerge(
                    `flex h-10
                    w-full  
                    border-b
                    border-[#2D2D2D]
                    bg-gray-100
                    bg-transparent
                    py-2
                    pr-3
                    text-sm
                    placeholder:text-primary-font
                    focus-visible:outline-none
                    `,
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
SearchInput.displayName = 'SearchInput'

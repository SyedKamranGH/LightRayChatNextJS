import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = { children: ReactNode; onClick: () => void; className?: string }

export const FileActionButton = (props: TProps) => {
    const { children, onClick, className } = props

    return (
        <button
            className={twMerge(
                'flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

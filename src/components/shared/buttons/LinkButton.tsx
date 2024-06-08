import Link, { type LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'

interface IProps {
    linkProps: LinkProps
    children: ReactNode
    className?: string
    type?: 'solid' | 'outline'
    /**
     * On Click Handler for internal button.
     */
    onClick?: () => void
}

const noop = () => null

const defaultProps = {
    type: 'outline',
    onClick: noop,
}

// TODO :: refactor into a more generic, reusable Button component
export const LinkButton = (props: IProps) => {
    const { linkProps, onClick, type, children, className } = props

    let defaultStyles = ''

    if (type === 'outline') {
        defaultStyles =
            'flex w-full items-center justify-center rounded-lg border border-secondary px-3 py-2 text-primary hover:bg-secondary/20'
    }

    if (type === 'solid') {
        defaultStyles =
            'flex w-full items-center justify-center rounded-lg bg-primary text-white transitions-color duration-300 ease-in-out p-3 font-medium hover:bg-primary/90'
    }

    return (
        <Link {...linkProps}>
            <button onClick={onClick} className={twMerge(defaultStyles, className)}>
                {children}
            </button>
        </Link>
    )
}

LinkButton.defaultProps = defaultProps

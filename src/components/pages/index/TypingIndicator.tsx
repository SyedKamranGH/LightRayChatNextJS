import { twJoin, twMerge } from 'tailwind-merge'
import styles from './TypingIndicator.module.css'

type TProps = { className?: string }

export const TypingIndicator = (props: TProps) => {
    const { className } = props

    return (
        <div
            className={twMerge(
                'flex items-center justify-center space-x-2',
                styles['typing-indicator'],
                className,
            )}
        >
            <div
                className={twJoin('h-[10px] w-[10px] rounded-full bg-gray-500/90', styles['dot'])}
            />
            <div
                className={twJoin('h-[10px] w-[10px] rounded-full bg-gray-500/90', styles['dot'])}
            />
            <div
                className={twJoin('h-[10px] w-[10px] rounded-full bg-gray-500/90', styles['dot'])}
            />
        </div>
    )
}

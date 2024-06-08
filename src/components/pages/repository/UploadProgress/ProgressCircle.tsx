import type { SVGProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = SVGProps<SVGSVGElement> & {
    percent: number
    size?: number
    stroke?: number
    foregroundClassName?: string
}

export const ProgressCircle = (props: TProps) => {
    const { percent, size = 20, stroke = 2, foregroundClassName, ...svgProps } = props
    const r = (size - stroke) / 2
    const offset = size / 2
    const circumference = 2 * Math.PI * r

    return (
        <svg width={size} height={size} {...svgProps}>
            <circle
                className="text-zinc-300"
                strokeWidth={stroke}
                stroke="currentColor"
                fill="transparent"
                r={r}
                cx={offset}
                cy={offset}
            />
            <circle
                className={twMerge('text-blue-600', foregroundClassName)}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - percent / 100)} // 50% of the circumference
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={r}
                cx={offset}
                cy={offset}
            />
        </svg>
    )
}

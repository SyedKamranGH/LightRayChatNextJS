import type { SVGProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = SVGProps<SVGSVGElement> & {
    percent: number
    size?: number
    stroke?: number
    foregroundClassName?: string
}

export const ProgressBar = (props: TProps) => {
    const { percent, size = 140, stroke = 10, foregroundClassName, ...svgProps } = props
    const width = size - stroke // Adjust width for stroke
    const height = stroke

    return (
        <svg width={size} height={10} {...svgProps}>
            <rect
                className="text-zinc-300"
                width={width}
                height={height}
                stroke="currentColor"
                strokeWidth={stroke}
                fill="transparent"
            />
            <rect
                className={twMerge('text-yellow-400', foregroundClassName)}
                width={width * (percent / 100)} // Progress width based on percentage
                height={height}
                fill="transparent"
                stroke="currentColor"
                strokeWidth={stroke}
            />
        </svg>
    )
}

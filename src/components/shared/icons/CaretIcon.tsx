import * as React from 'react'
import { SVGProps } from 'react'

export const CaretIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="21"
        height="28"
        viewBox="0 0 21 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_f_2126_1537)">
            <path d="M17 14.7692L0 4V24L17 14.7692Z" fill="#A2FEFF" />
        </g>
        <path d="M12 14.7692L0 4V24L12 14.7692Z" fill="#E01A22" />
        <defs>
            <filter
                id="filter0_f_2126_1537"
                x="-4"
                y="0"
                width="25"
                height="28"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2126_1537" />
            </filter>
        </defs>
    </svg>
)

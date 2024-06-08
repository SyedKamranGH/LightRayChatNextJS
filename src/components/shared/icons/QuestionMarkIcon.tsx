import { SVGProps } from 'react'

export const QuestionMarkIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx="24" 
                cy="24" 
                r="18" 
                transform="rotate(90 24 24)" 
                fill="#4B4B4B"
            />
            <path 
                d="M20 20C20 18.3431 21.567 17 23.5 17H24.5C26.433 17 28 18.3431 28 20C28.0756 21.3338 27.2603 22.5568 26 23C24.7397 23.5909 23.9244 25.2217 24 27" 
                stroke="white" 
                stroke-width="1.75" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
            <path 
                d="M24 31V31.01" 
                stroke="white" 
                stroke-width="1.75" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
        </svg>
    )
}

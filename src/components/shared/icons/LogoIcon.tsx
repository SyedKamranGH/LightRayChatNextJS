import { SVGProps } from 'react'

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="512"
            height="215"
            viewBox="0 0 512 215"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <image xlinkHref="/logo.png" />
        </svg>
    )
}

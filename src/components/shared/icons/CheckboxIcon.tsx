import type { SVGProps } from 'react'

type TProps = SVGProps<SVGSVGElement> & { checked?: boolean }

export const CheckboxIcon = (props: TProps) => {
    const { checked } = props

    if (checked) {
        return (
            <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M17.7099 3H4.66047C3.6309 3 2.79626 3.89543 2.79626 5V19C2.79626 20.1046 3.6309 21 4.66047 21H17.7099C18.7395 21 19.5741 20.1046 19.5741 19V5C19.5741 3.89543 18.7395 3 17.7099 3Z"
                    fill="black"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M15.6667 8.5L9.25004 14.9167L6.33337 12"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        )
    }

    return (
        <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17.7099 3H4.66047C3.6309 3 2.79626 3.89543 2.79626 5V19C2.79626 20.1046 3.6309 21 4.66047 21H17.7099C18.7395 21 19.5741 20.1046 19.5741 19V5C19.5741 3.89543 18.7395 3 17.7099 3Z"
                stroke="#DCDCDC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}

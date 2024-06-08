import type { SVGProps } from 'react'

type TProps = SVGProps<SVGSVGElement> & { size?: number }

export const PdfIcon = (props: TProps) => {
    const { size = 23, ...svgProps } = props

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <rect width="23" height="23" fill="url(#pdf-icon)" />
            <defs>
                <pattern id="pdf-icon" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_110_2865" transform="scale(0.00195312)" />
                </pattern>
                <image id="image0_110_2865" width="512" height="512" href="/pdf-icon.png" />
            </defs>
        </svg>
    )
}

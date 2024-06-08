import type { SVGProps } from 'react'

type TProps = SVGProps<SVGSVGElement> & { size?: number }

export const GoogleDriveIcon = (props: TProps) => {
    const { size = 20, ...svgProps } = props

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <rect width={size} height={size} fill="url(#google-drive-icon)" stroke="none" />
            <defs>
                <pattern
                    id="google-drive-icon"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use href="#googledrive" transform="scale(0.00195312)" />
                </pattern>
                <image id="googledrive" width="512" height="512" href="/googledrive_icon.png" />
            </defs>
        </svg>
    )
}

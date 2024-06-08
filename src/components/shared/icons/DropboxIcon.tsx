import type { SVGProps } from 'react'

type TProps = SVGProps<SVGSVGElement> & { size?: number }

export const DropboxIcon = (props: TProps) => {
    const { size = 20, ...svgProps } = props

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <rect width={size} height={size} fill="url(#dropbox-icon)" stroke="none" />
            <defs>
                <pattern
                    id="dropbox-icon"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use href="#dropbox" transform="scale(0.00195312)" />
                </pattern>
                <image id="dropbox" width="512" height="512" href="/dropbox_icon.png" />
            </defs>
        </svg>
    )
}

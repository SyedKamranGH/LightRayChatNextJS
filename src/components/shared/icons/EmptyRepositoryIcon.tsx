import { SVGProps } from 'react'

export const EmptyRepositoryIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <rect width="200" height="200" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_2518_12807" transform="scale(0.000976562)" />
                </pattern>
                <image
                    id="image0_2518_12807"
                    width="1024"
                    height="1024"
                    xlinkHref="/image/empty-repository.png"
                />
            </defs>
        </svg>
    )
}

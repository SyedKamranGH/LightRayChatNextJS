import type { SVGProps } from 'react'

export const SidebarIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            version="1.1"
            fill="currentColor"
            {...props}
        >
            <path d="M960 288H64C44.8 288 32 275.2 32 256s12.8-32 32-32h896c19.2 0 32 12.8 32 32s-12.8 32-32 32zM960 544H64C44.8 544 32 531.2 32 512s12.8-32 32-32h896c19.2 0 32 12.8 32 32s-12.8 32-32 32zM960 800H64c-19.2 0-32-12.8-32-32s12.8-32 32-32h896c19.2 0 32 12.8 32 32s-12.8 32-32 32z" />
        </svg>
    )
}

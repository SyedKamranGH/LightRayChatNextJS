import { PiMagnifyingGlassBold } from 'react-icons/pi'

import { LinkButton } from '@/components/shared'

export const NewSearchButton = () => {
    return (
        <LinkButton
            linkProps={{ href: { pathname: '/', query: { chatType: 'SEARCH' } }, shallow: false }}
            className="h-[55px] justify-start gap-x-2 px-8"
        >
            <PiMagnifyingGlassBold className="text-lg font-medium text-primary" />
            <p className="text-text-primary">Search</p>
        </LinkButton>
    )
}

import { FaRegNewspaper } from 'react-icons/fa'

import { LinkButton } from '@/components/shared'

export const NewNewsListener = () => {
    return (
        <LinkButton
            className="h-[55px] justify-start gap-x-2 px-8"
            linkProps={{
                href: { pathname: '/', query: { chatType: 'NEWS_LISTENER' } },
                shallow: false,
            }}
        >
            <FaRegNewspaper className="text-lg font-medium text-text-primary" />
            <p className="text-text-primary">News Listener</p>
        </LinkButton>
    )
}

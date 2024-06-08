import { HiOutlinePlusSm } from 'react-icons/hi'
import { LinkButton } from '@/components/shared'

export const NewChatButton = () => {
    return (
        <LinkButton
            linkProps={{ href: '/', shallow: false }}
            className="h-[55px] justify-start gap-x-2 px-8"
            type="outline"
        >
            <HiOutlinePlusSm className="text-xl font-medium text-text-primary" />
            <p className="text-left text-text-primary">New Search</p>
        </LinkButton>
    )
}

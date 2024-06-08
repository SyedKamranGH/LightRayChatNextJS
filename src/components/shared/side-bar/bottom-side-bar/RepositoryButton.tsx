import { FaFolderOpen } from 'react-icons/fa'

import { LinkButton } from '@/components/shared'

export const RepositoryButton = () => {
    return (
        <LinkButton linkProps={{ href: '/repository' }} type="solid" className="gap-x-3">
            <FaFolderOpen className="h-5 w-5" />
            <p className="text-base">Repository Files</p>
        </LinkButton>
    )
}

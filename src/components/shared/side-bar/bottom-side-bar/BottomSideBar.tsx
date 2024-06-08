import { UserProfile } from './UserProfile'
import { RepositoryButton } from './RepositoryButton'
import { SidebarMenuGroup } from '../top-side-bar/SidebarMenuGroup'
import { NewChatButton } from '../top-side-bar/NewChatButton'
import { NewSearchButton } from '../top-side-bar/NewSearchButton'
import { NewNewsListener } from '../NewNewsLitener'

export const BottomSideBar = () => {
    return (
        <div className="mx-2 mb-2 mt-4 flex-1 flex-col justify-between gap-y-8">
            <div className="flex h-[180px] flex-col justify-between">
                <NewChatButton />
                <NewSearchButton />
                <NewNewsListener />
            </div>
            <div className="px-4">
                <SidebarMenuGroup />
            </div>
            <div className="mt-9">
                <UserProfile />
            </div>
        </div>
    )
}

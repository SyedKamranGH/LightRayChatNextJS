import { SidebarMenuButton } from './SidebarMenuButton'
import { UserIcon } from '@/components/shared/icons'
import { HomeIcon } from '../assets/HomeIcon'
import { ChatIcon } from '../assets/ChatIcon'
import { FileRepoIcon } from '../assets/FileRepoIcon'

export const SidebarMenuGroup = () => {
    return (
        <div className="flex flex-col justify-between">
            <SidebarMenuButton label="Home" Logo={HomeIcon} link="/home" />
            <SidebarMenuButton label="Search History" Logo={ChatIcon} link="/chat-history" />
            <SidebarMenuButton label="Searches" Logo={UserIcon} link="/searches" />
            <SidebarMenuButton label="News" Logo={UserIcon} link="/news" />
            <SidebarMenuButton label="Repository Files" Logo={FileRepoIcon} link="/repository" />
            {/* <SidebarMenuButton label="Trash" Logo={UserIcon} /> */}
        </div>
    )
}

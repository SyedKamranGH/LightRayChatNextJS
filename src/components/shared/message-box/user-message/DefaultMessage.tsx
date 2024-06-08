import type { TDefaultMessage } from '@/queries/messages'

import { ChatContainer } from '@/components/shared'
import { UserProfile } from './UserProfile'

export const isDefaultMessage = (message: Object): message is TDefaultMessage => {
    // 'role' must be 'user'
    if (!('role' in message) || message.role !== 'user') return false

    // 'type' must not exist
    if ('type' in message) return false

    // 'content' must exist
    if (!('content' in message)) return false

    return true
}

export const DefaultMessage = ({ message }: { message: TDefaultMessage }) => {
    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-4">
                <UserProfile />
                <p className="md:paragraph-regular body-regular ml-[45px]">{message.content}</p>
            </div>
        </ChatContainer>
    )
}

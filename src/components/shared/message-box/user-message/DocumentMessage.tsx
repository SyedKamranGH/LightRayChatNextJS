import { ChatContainer } from '@/components/shared'
import type { TDocumentMessage } from '@/queries/messages'
import { UserProfile } from './UserProfile'
import { FileUploadProgressMessage } from './FileUploadProgressMessage'

export const isDocumentMessage = (message: Object): message is TDocumentMessage => {
    // 'role' must be 'user'
    if (!('role' in message) || message.role !== 'user') return false
    // 'type' must be 'DOCUMENT'
    if (!('type' in message) || message.type !== 'DOCUMENT') return false
    // 'documents' must exist as Array
    if (!('documents' in message) || !Array.isArray(message.documents)) return false

    return true
}

export const DocumentMessage = ({ message }: { message: TDocumentMessage }) => {
    const { documents } = message

    return (
        <ChatContainer>
            <div className="flex h-auto w-full flex-col justify-start gap-4">
                <UserProfile />

                {documents.map(document => (
                    <FileUploadProgressMessage key={document.filename} document={document} />
                ))}
            </div>
        </ChatContainer>
    )
}

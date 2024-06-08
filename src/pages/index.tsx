import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { MessageList } from '@/components/pages/MessageList'
import { ChatHeading } from '@/components/pages/chat'
import { LandingPage } from '@/components/pages/index'
import { InputBar, Layout, type TMessageBox } from '@/components/shared'
import { DisclaimerModal } from '@/components/shared/modals/DisclaimerModal'
import { useSendFile } from '@/hooks/useSendFile'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useRefreshProfile } from '@/hooks/useRefreshProfile'

export default function Home() {
    const router = useRouter()
    const [newChat, setNewChat] = useState<TMessageBox[]>([])
    const [showDisclaimer, setShowDisclaimer] = useState(false)

    const sendMessage = useSendMessage(setNewChat)
    const sendFile = useSendFile(setNewChat)

    useEffect(() => {
        return () => {
            if (sendFile.reset) sendFile.reset()
            if (sendMessage.reset) sendMessage.reset()
        }
    }, [])

    useEffect(() => {
        if (router.query && 'disclaimer' in router.query) {
            setShowDisclaimer(true)
        }
    }, [])

    useRefreshProfile()

    const isLoading = sendMessage.isLoading || sendFile.isLoading

    return (
        <>
            <Layout>
                <div className="flex h-full w-full overflow-hidden">
                    <div className="relative flex h-full w-full flex-col overflow-hidden">
                        {newChat.length > 0 ? (
                            <>
                                <ChatHeading title="New Search" chatId="" />
                                <MessageList newChat={newChat} isLoading={isLoading} />

                                <InputBar sendMessage={sendMessage.mutate} isLoading={isLoading} />
                            </>
                        ) : (
                            <LandingPage
                                sendMessage={sendMessage.mutate}
                                sendFile={sendFile.mutate}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </div>
            </Layout>
            <DisclaimerModal
                showModal={false}
                onClose={() => {
                    setShowDisclaimer(false)
                    router.replace('/', undefined, { shallow: true })
                }}
            />
        </>
    )
}

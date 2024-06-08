import { useRouter } from 'next/router'

import { useAuthStore } from '@/store/auth-store'
import { getTimeOfDay } from '@/utils/dateTime'

import { NewChatWelcome } from './NewChatWelcome'
import { NewSearchWelcome } from './NewSearchWelcome'
import { NewsListenerWelcome } from './NewsListenerWelcome'

export const Header = () => {
    const router = useRouter()
    const { chatType } = router.query

    const user = useAuthStore(state => state.user)
    const greetingMessage = `${getTimeOfDay()} ${user.name}!`

    if (chatType === 'SEARCH') {
        return <NewSearchWelcome greetingMessage={greetingMessage} />
    }

    if (chatType === 'NEWS_LISTENER') {
        return <NewsListenerWelcome greetingMessage={greetingMessage} />
    }

    return <NewChatWelcome greetingMessage={greetingMessage} />
}

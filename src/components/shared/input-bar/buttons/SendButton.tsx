import { twMerge } from 'tailwind-merge'

import { LoadingIcon, SendIcon } from '@/components/shared/icons'

const SendButtonIcon = ({ isLoading = false, nothingToSend = false }) => {
    if (isLoading) return <LoadingIcon />
    return (
        <SendIcon
            className={twMerge('transition', nothingToSend ? 'fill-gray-300' : 'fill-white')}
        />
    )
}

export const SendButton = ({ isLoading = false, nothingToSend = true }) => {
    return (
        <button
            type="submit"
            className={twMerge(
                'h-10 w-10 rounded-lg p-2 transition',
                nothingToSend && !isLoading ? 'bg-white' : 'bg-primary shadow-lg',
            )}
            disabled={isLoading || nothingToSend}
        >
            <SendButtonIcon isLoading={isLoading} nothingToSend={nothingToSend} />
        </button>
    )
}

interface IProps {
    greetingMessage: string
}

export const NewsListenerWelcome = (props: IProps) => {
    const { greetingMessage } = props

    return (
        <div className="w-full animate-fadeInUp space-y-2">
            <p className="font-title font-semibold text-gray-400 sm:text-lg lg:text-xl">
                {greetingMessage}
            </p>
            <p className="font-title text-lg font-semibold text-gray-500/70 sm:text-xl lg:text-2xl">
                Discover More! 🔎 What News Would You Like to be Notified?
            </p>
        </div>
    )
}

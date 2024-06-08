interface IProps {
    greetingMessage: string
}

export const NewChatWelcome = (props: IProps) => {
    const { greetingMessage } = props

    return (
        <div className="w-full animate-fadeInUp space-y-2">
            <p className="font-title font-semibold text-gray-400 sm:text-lg lg:text-xl">
                {greetingMessage}
            </p>
            <p className="font-title text-lg font-semibold text-gray-500/70 sm:text-xl lg:text-2xl">
                {`Let's Search!`} 🚀 How may I assist you today?
            </p>
        </div>
    )
}

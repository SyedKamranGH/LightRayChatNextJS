export const ErrorMessageAlert = (props: { errorMessage?: string; className?: string }) => {
    const { errorMessage } = props

    if (!errorMessage) return errorMessage

    return <p className="animate-fadeIn py-4 font-medium text-red-500">{errorMessage}</p>
}

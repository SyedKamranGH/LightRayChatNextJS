type TProps = { title: string; message?: string }

export const ToastError = (props: TProps) => {
    const { title, message } = props

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3 px-2">
                ❌<h2 className="text-lg font-medium text-black">{title}</h2>
            </div>

            {Boolean(message) && (
                <>
                    <div className="py-3">
                        <Divider />
                    </div>
                    <div className="px-2">
                        <p className="text-black">{message}</p>
                    </div>
                </>
            )}
        </div>
    )
}

const Divider = () => <div className="h-0 w-full border border-neutral-400" />

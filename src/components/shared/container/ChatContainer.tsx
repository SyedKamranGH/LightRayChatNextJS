import type { ReactNode } from 'react'

type TProps = {
    children: ReactNode
}

export const ChatContainer = ({ children }: TProps) => {
    return (
        <div className="h-fit w-full p-4">
            <div className="mx-auto flex max-w-3xl">{children}</div>
        </div>
    )
}

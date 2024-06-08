import { ReactNode } from 'react'

type TProps = { children: ReactNode; onClick: () => void }

export const ChatActionItem = ({ children, onClick }: TProps) => {
    return (
        <div className="py-2">
            <button
                className="flex w-full items-center gap-x-3 rounded-md px-2 py-1 transition hover:bg-secondary"
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

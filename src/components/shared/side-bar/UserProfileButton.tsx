import { twMerge } from 'tailwind-merge'

export const UserProfileButton = ({
    name = '',
    className,
}: {
    name: string
    className?: string
}) => {
    const initial = name.length > 2 ? name.slice(0, 2) : name
    return (
        <div
            className={twMerge(
                'flex h-[30px] min-h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full bg-grey-500',
                className,
            )}
        >
            <span className="body-medium text-center uppercase">{initial}</span>
        </div>
    )
}

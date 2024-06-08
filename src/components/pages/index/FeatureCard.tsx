import { cn } from '@/utils/cn'

const noop = () => null

interface IProps {
    title: string
    description: string
    className?: string
    onClick?: () => void
}

const defaultProps = {
    onClick: noop,
}

export const FeatureCard = (props: IProps) => {
    const { title, description, className, onClick } = props

    return (
        <div
            className={cn(
                // we use a `group` feature from tailwind which allow us
                // to change the styles of child component when we hover on parent card
                // Ref - https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
                'duration-400 group mt-3 space-y-4 rounded-lg bg-secondary/30 p-7 transition-colors ease-linear hover:bg-secondary/40 sm:min-h-[300px] sm:w-[250px]',
                className,
            )}
            onClick={onClick}
        >
            <p className="text-lg font-[600] text-[#828282] group-hover:text-primary">{title}</p>
            <p className="text-[#828282] group-hover:text-[#7A7A7A]">{description}</p>
        </div>
    )
}

FeatureCard.defaultProps = defaultProps

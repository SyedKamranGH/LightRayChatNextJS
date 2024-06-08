import { twMerge } from 'tailwind-merge'

type TProps = { text: string; textStyle?: string; containerStyle?: string; lineStyle?: string }

export const LineThroughText = ({ text, textStyle, containerStyle, lineStyle }: TProps) => {
    const renderLine = () => <div className={twMerge('h-px flex-grow bg-zinc-300', lineStyle)} />

    return (
        <div className={twMerge('flex items-center gap-5', containerStyle)}>
            {renderLine()}
            <p className={twMerge('text-xs', textStyle)}>{text}</p>
            {renderLine()}
        </div>
    )
}

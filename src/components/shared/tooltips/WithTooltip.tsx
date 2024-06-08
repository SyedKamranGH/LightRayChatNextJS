import { Tooltip as ReactTooltip, PlacesType } from 'react-tooltip'

interface IWithTooltipProps {
    children: React.ReactNode
    tooltipText: string
    placement?: PlacesType // Making placement prop optional
}

/**
 * This is a wrapper component around react-tooltip library.
 */
export const WithTooltip = (props: IWithTooltipProps) => {
    const { children, tooltipText, placement = 'bottom' } = props

    return (
        <>
            <ReactTooltip id="react-tooltip" className="absolute z-50 max-w-[350px] text-center" />
            <div
                data-tooltip-id="react-tooltip"
                data-tooltip-content={tooltipText}
                data-tooltip-place={placement}
            >
                {children}
            </div>
        </>
    )
}

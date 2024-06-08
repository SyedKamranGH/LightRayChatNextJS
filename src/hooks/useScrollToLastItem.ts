import { useEffect, useState, type RefObject, useRef } from 'react'

/**
 * By default, it will scroll to the last item in the list.
 * If scrolling up is detected, it will deactivate the behavior.
 * Scrolling back down to the bottom will reactivate the behavior.
 */
export const useScrollToLastItem = (ref: RefObject<HTMLElement>) => {
    const [shouldScrollToLastItem, setShouldScrollToLastItem] = useState(true)
    const previousScrollFromTop = useRef(0)

    useEffect(() => {
        const isScrollingUp = () => {
            const currentScrollFromTop = ref.current?.scrollTop ?? 0
            const isScrollingUp = currentScrollFromTop < previousScrollFromTop.current
            return isScrollingUp
        }

        const hasScrollReachedBottom = (thresholdInPx = 20) => {
            const currentScrollFromTop = ref.current?.scrollTop ?? 0
            const listHeight = ref.current?.clientHeight ?? 0
            // This is the distance from the very top of the scroll to the bottom of the list
            const scrollDistanceToBottom = currentScrollFromTop + listHeight

            // This is the height of the entire scrollable area
            const entireScrollableHeight = ref.current?.scrollHeight ?? 0

            return scrollDistanceToBottom + thresholdInPx >= entireScrollableHeight
        }

        const onScroll = () => {
            if (hasScrollReachedBottom()) {
                setShouldScrollToLastItem(true)
            } else if (isScrollingUp()) {
                setShouldScrollToLastItem(false)
            }
            previousScrollFromTop.current = ref.current?.scrollTop ?? 0
        }

        ref.current?.addEventListener('scroll', onScroll)

        const currentRef = ref.current
        return () => {
            currentRef?.removeEventListener('scroll', onScroll)
        }
    }, [ref])

    const scrollToLastItem = () => {
        if (!shouldScrollToLastItem) return
        const lastItem = ref.current?.lastElementChild
        lastItem?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }

    return { scrollToLastItem }
}

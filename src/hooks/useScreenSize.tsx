import { useMediaQuery } from 'react-responsive'

export const useScreenSize = () => {
    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isLaptop = useMediaQuery({ minWidth: 1224, maxWidth: 1824 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 })
    const isMobile = useMediaQuery({ maxWidth: 768 })

    return {
        isBigScreen,
        isLaptop,
        isTablet,
        isMobile,
    }
}

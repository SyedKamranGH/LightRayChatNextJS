import { PropsWithChildren, useEffect, useState } from 'react'

export const ZustandHydration = ({ children }: PropsWithChildren) => {
    const [isHydrated, setIsHydrated] = useState(false)

    // wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return <>{isHydrated ? <div>{children}</div> : null}</>
}

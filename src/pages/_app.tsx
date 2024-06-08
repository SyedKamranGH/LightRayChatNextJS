import { useEffect, useState } from 'react'
// centralised logging interface
import { LogBase } from 'debug-next'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Sentry from '@sentry/nextjs'

import { montserrat } from '@/utils/fonts'

import { ZustandHydration } from '@/utils/Hydration'
import { SidebarContext } from '@/components/shared'
import { useScreenSize } from '@/hooks/useScreenSize'

import '../styles/globals.css'
import { useRefreshProfile } from '@/hooks/useRefreshProfile'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const { isMobile } = useScreenSize()
    const [showSidebar, setShowSidebar] = useState(!isMobile)

    useEffect(() => {
        LogBase.init('lightray-chat', __dirname)
    }, [])

    return (
        <>
            <style jsx global>{`
                :root {
                    --font-montserrat: ${montserrat.style.fontFamily};
                }
            `}</style>
            <Sentry.ErrorBoundary>
                <ZustandHydration>
                    <ThemeProvider defaultTheme="light" attribute="class">
                        <QueryClientProvider client={queryClient}>
                            <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
                                <main className={`${montserrat.className}`}>
                                    <Component {...pageProps} />
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={3000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        draggable={false}
                                        closeOnClick
                                        pauseOnHover
                                    />
                                </main>
                            </SidebarContext.Provider>
                        </QueryClientProvider>
                    </ThemeProvider>
                </ZustandHydration>
            </Sentry.ErrorBoundary>
        </>
    )
}

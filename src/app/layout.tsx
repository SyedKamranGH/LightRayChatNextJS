import '@/styles/globals.css'
import { montserrat } from '@/utils/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} antialiased`}>{children}</body>
        </html>
    )
}

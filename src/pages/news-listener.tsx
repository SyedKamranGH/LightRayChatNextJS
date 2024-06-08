import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '@/components/shared'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import { NewsListenerRecords } from '@/components/pages/news-listener'

export default function NewsListener() {
    useProtectRoute()

    return (
        <Layout>
            <header className="shadow-header">
                <div className="mx-[15px] mb-6 mt-[30px] flex max-w-5xl items-center justify-between sm:mb-10 md:mx-[150px] 2xl:mx-auto">
                    <h1 className="h4-medium sm:h1-medium">Subscribed News</h1>
                    <div className="flex h-fit">
                        <Link
                            href="/news-listener/listen"
                            className="rounded-[5px] bg-black p-[5px] sm:p-3"
                        >
                            <Image
                                src="/assets/icons/rss.svg"
                                height={24}
                                width={24}
                                alt="subscribe to news"
                                className="max-sm:h-[18px] max-sm:w-[18px]"
                            />
                        </Link>
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto">
                <NewsListenerRecords />
            </div>
        </Layout>
    )
}

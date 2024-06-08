import { Layout } from '@/components/shared'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import { SearchHistoryRecords } from '@/components/pages/search-history'

export default function SearchHistory() {
    useProtectRoute()

    return (
        <Layout>
            <section className="flex h-full w-full items-center overflow-y-auto">
                <div className="relative mx-5 flex h-full max-w-4xl flex-1 flex-col pt-[30px] max-lg:pt-5 md:mx-[150px] 2xl:mx-auto">
                    <div className="flex h-fit w-full justify-between">
                        <h1 className="md:h1-medium max-lg:h4-medium w-full">Search History</h1>
                    </div>

                    {/* TODO: Organise search feature to be implemented */}
                    {/* <div className="mt-8 flex h-fit w-full flex-col gap-[15px] rounded-lg bg-neutral-100 p-[30px]">
            <span className="paragraph-medium">Organise your chats</span>
            <p className="body-regular">
                Seamlessly arrange and categorise your chat messages, making it easy to find
                important information, track discussions and staying organised.
            </p>
            <Link href="/" className="body-regular underline">
                Get Started
            </Link>
        </div> */}
                    <SearchHistoryRecords />
                </div>
            </section>
        </Layout>
    )
}

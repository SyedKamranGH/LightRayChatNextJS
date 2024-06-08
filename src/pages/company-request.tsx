import { Layout } from '@/components/shared'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import { CompanyRequestFormMessage } from '@/components/shared/message-box/system-message/CompanyRequestFormMessage'

export default function CompanyRequest() {
    useProtectRoute()

    return (
        <Layout>
            <section className="flex h-full w-full items-center overflow-y-auto">
                <div className="relative mx-5 flex h-full max-w-4xl flex-1 flex-col pt-[30px] max-lg:pt-5 md:mx-[150px] 2xl:mx-auto">
                    <div className="flex h-fit w-full justify-between">
                        <h1 className="md:h1-medium max-lg:h4-medium w-full">Company Request</h1>
                    </div>
                    <CompanyRequestFormMessage />
                </div>
            </section>
        </Layout>
    )
}

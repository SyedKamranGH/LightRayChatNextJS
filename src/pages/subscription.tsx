import Image from 'next/image'
import { Layout } from '@/components/shared'
import { useAuthStore } from '@/store/auth-store'
import { SubscriptionPlanCard } from '@/components/pages/subscription/SubscriptionPlanCard'
import Link from 'next/link'

export default function Subscription() {
    const { user } = useAuthStore(state => ({
        user: state.user,
    }))

    return (
        <Layout>
            <div className="flex h-full flex-col items-center justify-between gap-10 overflow-y-auto px-6 pb-20 pt-[30px] sm:px-12">
                <p className="text-2xl font-medium text-black md:text-5xl">Pricing and Plans</p>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    <SubscriptionPlanCard
                        title="Basic Plan"
                        priceMonthly="Free"
                        planName="BASIC"
                        priceYearly="For a lifetime"
                        featuresList={[
                            'Unlimited conversations',
                            'Unlimited news',
                            '50 responses per day',
                            '5 repository documents',
                            '5 Internet searches per day',
                            'Supports PDF',
                        ]}
                        paymentLink="#"
                        isPlanSubscribed={user.subscribedPlan === 'BASIC' || !user.subscribedPlan}
                    />
                    <SubscriptionPlanCard
                        title="Lite Plan"
                        planName="LITE"
                        priceMonthly="$15"
                        priceYearly="$180 yearly"
                        featuresList={[
                            'Unlimited conversations',
                            'Unlimited news',
                            'Unlimited responses per day',
                            '20 repository documents',
                            '20 Internet searches per day',
                            'Supports PDF, Doc',
                        ]}
                        paymentLink={process.env.NEXT_PUBLIC_LITE_PLAN_PAYMENT_LINK!}
                        isPlanSubscribed={user.subscribedPlan === 'LITE'}
                    />
                    <SubscriptionPlanCard
                        title="Pro Plan"
                        planName="PRO"
                        priceMonthly="$99"
                        priceYearly="$1,188 yearly"
                        featuresList={[
                            'Unlimited conversations',
                            'Unlimited news',
                            'Unlimited responses per day',
                            'Unlimited repository documents',
                            '100 Internet searches per day',
                            'Supports PDF (OCR), Doc, Txt',
                        ]}
                        paymentLink={process.env.NEXT_PUBLIC_PRO_PLAN_PAYMENT_LINK!}
                        isPlanSubscribed={user.subscribedPlan === 'PRO'}
                    />
                </div>
                <EnterprisePlanCard />
            </div>
        </Layout>
    )
}

const EnterprisePlanCard = () => {
    return (
        <div className="flex w-full min-w-[280px] max-w-5xl items-start justify-start gap-2 rounded-lg border border-zinc-300 bg-white p-4 sm:p-8">
            <Image
                src="/assets/icons/pink_diamond.svg"
                width={50}
                height={50}
                alt="Pink diamon icon"
                className="pt-1"
            />
            <div className="">
                <span>Elevate your business with our </span>
                <span className="font-semibold">Enterprise Plan</span>
                <span>
                    {' '}
                    — personalised features, dedicated support, and a scalable solution crafted for
                    your unique needs.{' '}
                </span>
                <Link className="font-semibold underline" href="https://pints.ai">
                    Learn More
                </Link>
                <span>.</span>
            </div>
        </div>
    )
}

import Image from 'next/image'
import { PaymentButton } from './PaymentButton'

type TPlanName = 'BASIC' | 'LITE' | 'PRO'

type TSubscriptionPlanCardProps = {
    title: string
    description?: string
    planName: TPlanName
    priceMonthly: string
    priceYearly: string
    featuresList: string[]
    paymentLink: string
    isPlanSubscribed: boolean
}

export const SubscriptionPlanCard = (props: TSubscriptionPlanCardProps) => {
    const {
        title,
        description,
        planName,
        priceMonthly,
        priceYearly,
        featuresList,
        paymentLink,
        isPlanSubscribed,
    } = props

    let diamondColor = 'white'
    if (planName === 'LITE') diamondColor = 'blue'
    if (planName === 'PRO') diamondColor = 'green'

    return (
        <div className="flex h-[550px] w-full min-w-[280px] max-w-xs rounded-lg border bg-white md:h-[600px]">
            <div className="flex w-full flex-col gap-y-4 px-[32px] py-[32px]">
                <Image
                    className="ml-auto"
                    src={`/assets/icons/${diamondColor}_diamond.svg`}
                    width={50}
                    height={50}
                    alt={`${diamondColor} Diamond`}
                />

                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-black">{title}</h3>
                    <div>
                        <span className="text-5xl font-bold text-black md:text-6xl">
                            {priceMonthly}
                        </span>
                        {priceMonthly !== 'Free' && (
                            <span className="text-3xl font-bold text-black">/mo</span>
                        )}
                    </div>
                    <p>{priceYearly}</p>
                </div>

                <div className="flex flex-col gap-y-4">
                    <div className="border-t border-gray-200"></div>
                    {description && <p className="text-sm text-gray-500">{description}</p>}
                    <p className="text-sm text-gray-500">Includes:</p>
                    <ul className="flex flex-col gap-y-2">
                        {featuresList.map(feature => (
                            <li key={feature} className="flex items-center">
                                <Image
                                    src="/assets/icons/tick.svg"
                                    width={24}
                                    height={24}
                                    alt="Checked Icon"
                                />

                                <span className="ml-2 text-sm text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <PaymentButton isCurrentPlan={isPlanSubscribed} paymentLink={paymentLink} />
            </div>
        </div>
    )
}

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/shared'
import { Modal } from '@/components/shared/modals/Modal'
import { useAuthStore } from '@/store/auth-store'
import { CloseIcon } from '@/components/shared/icons'
import { LineThroughText } from '@/components/shared/dividers/LineThroughText'

export const PaymentButton = ({
    isCurrentPlan,
    paymentLink,
}: {
    isCurrentPlan: boolean
    paymentLink: string
}) => {
    const [user, isLoggedIn] = useAuthStore(state => [state.user, state.isLoggedIn])

    if (!isLoggedIn) {
        return <NotLoggedInPaymentButton />
    }

    if (isCurrentPlan) {
        return <Button className="mt-auto">Current Plan</Button>
    }

    if (user.subscribedPlan !== 'BASIC') {
        return <AlreadySubscribedCustomerPaymentButton />
    }

    return (
        <NewlySubscribedCustomerPaymentButton
            paymentLink={`${paymentLink}?prefilled_email=${user.email}&client_reference_id=${user.userId}`}
        />
    )
}

const NotLoggedInPaymentButton = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button className="mt-auto w-full" variant="primary" onClick={() => setShowModal(true)}>
                Upgrade Plan
            </Button>
            <Modal
                showModal={showModal}
                className="flex max-w-sm flex-col divide-y rounded-md p-0 md:p-0"
                onClose={() => setShowModal(false)}
            >
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-2">
                        ✨
                        <h3 className="font-montserrat text-lg font-medium">
                            Sign Up to Get Your Plan
                        </h3>
                    </div>
                    <button className="px-2" onClick={() => setShowModal(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-5 font-montserrat">
                    <p>
                        Get access to exclusive features and elevate your experience. <br />
                        <br />
                        Sign up now to upgrade your plan and enjoy a premium SaaS experience.
                    </p>

                    <Link href="/signup" className="w-full">
                        <Button className="w-full rounded-md py-3 font-medium" variant="primary">
                            Sign Up Now
                        </Button>
                    </Link>

                    <LineThroughText text="or" />

                    <p>Already have an account? Log in to unlock premium features.</p>

                    <Link href="/login" className="w-full">
                        <Button className="w-full rounded-md py-3 font-medium">Login</Button>
                    </Link>
                </div>
            </Modal>
        </>
    )
}

const NewlySubscribedCustomerPaymentButton = ({ paymentLink }: { paymentLink: string }) => {
    return (
        <Link className="mt-auto w-full" href={paymentLink}>
            <Button className="mt-auto w-full" variant="primary">
                Upgrade Plan
            </Button>
        </Link>
    )
}

const AlreadySubscribedCustomerPaymentButton = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button className="mt-auto w-full" variant="primary" onClick={() => setShowModal(true)}>
                Contact Support
            </Button>
            <Modal
                showModal={showModal}
                className="flex max-w-sm flex-col divide-y rounded-md p-0 font-montserrat md:p-0"
                onClose={() => setShowModal(false)}
            >
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-2">
                        ✨<h3 className="text-lg font-medium">Change Your Subscription Plan</h3>
                    </div>
                    <button className="px-2" onClick={() => setShowModal(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-5">
                    <p>
                        Please contact customer support at support@pints.ai to make changes to your
                        subscription. Thank you.
                    </p>
                </div>
            </Modal>
        </>
    )
}

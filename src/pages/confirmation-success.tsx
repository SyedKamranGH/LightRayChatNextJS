import { Button, Logo } from '@/components/shared'
import Image from 'next/image'
import Link from 'next/link'

const ConfirmationSuccess = () => {
    return (
        <div className="mx-auto flex h-screen max-w-3xl flex-col justify-center gap-y-5 p-12 pt-10 text-center sm:px-32">
            <div className="mx-auto w-fit">
                <Image
                    src={'/image/confirmation-success.png'}
                    alt="confirmation image"
                    width={0}
                    height={0}
                    sizes="40vh"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="space-y-5">
                <h1 className="text-3xl font-semibold">Awesome!</h1>
                <div className="[text-wrap:balance text-sm">
                    You have successfully created your account. Proceed to LightRay!
                </div>
            </div>
            <Link href="/" className="w-full">
                <Button variant="primary" className="w-full py-3">
                    Start Exploring
                </Button>
            </Link>
        </div>
    )
}

export default ConfirmationSuccess

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/shared/buttons'

type TProps = {
    imgSrc: string
    title: string
    description: string
    href: string
    buttonText?: string
}

export const InformationContainer = ({ imgSrc, title, description, href, buttonText }: TProps) => {
    return (
        <section className="h-full px-4">
            <div className="mx-auto flex h-full min-h-[600px] max-w-xl flex-col items-center justify-center">
                <Image src={imgSrc} height={200} width={200} alt="" />

                <div className="my-[35px]">
                    <h1 className="base-medium text-center">{title}</h1>
                    <p className="paragraph-regular mt-[15px] text-center">{description}</p>
                </div>

                <Link href={href}>
                    <Button className="rounded-[5px] px-6 py-3" variant="primary">
                        {buttonText || 'OK'}
                    </Button>
                </Link>
            </div>
        </section>
    )
}

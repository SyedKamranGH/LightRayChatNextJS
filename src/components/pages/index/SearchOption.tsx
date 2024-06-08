import { RadioGroup } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

type TSearchOptionProps = {
    value: 'repository' | 'google'
    title: string
    imageUrl: string
    description?: string
}

export const SearchOption = ({ value, title, description, imageUrl }: TSearchOptionProps) => {
    return (
        <RadioGroup.Option
            value={value}
            className={twMerge(
                'sticky flex w-fit cursor-pointer items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 transition',
                'hover:border-primary-700 hover:bg-white hover:shadow-card',
                'ui-checked:border-primary-700 ui-checked:bg-gradient-to-b ui-checked:from-primary-700/10 ui-checked:to-transparent',
            )}
        >
            <Image src={imageUrl} alt="search option" width={20} height={20} />
            <p className="text-sm font-medium">{title}</p>
        </RadioGroup.Option>
    )
}

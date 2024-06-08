import { Popover, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = {
    renderButton: () => ReactNode
    buttonStyle?: string
    renderMenu: () => ReactNode
    menuStyle?: string
}

export const PopoverMenu = (props: TProps) => {
    const { renderButton, buttonStyle, renderMenu, menuStyle } = props

    return (
        <Popover as="div" className="relative flex items-center">
            <Popover.Button className={buttonStyle}>{renderButton()}</Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Popover.Panel
                    className={twMerge(
                        'absolute right-0 top-6 z-50 whitespace-nowrap rounded-md border border-grey-300 bg-neutral-100 shadow-lg',
                        menuStyle,
                    )}
                >
                    {renderMenu()}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

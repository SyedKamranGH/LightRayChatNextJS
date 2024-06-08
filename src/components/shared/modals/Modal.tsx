import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = {
    showModal: boolean
    children: ReactNode
    className?: string
    // Making optional, as some modals we only want specific way of closing it.
    onClose?: () => void
}

export const Modal = (props: TProps) => {
    const { showModal, children, className, onClose = () => {} } = props

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog className="absolute left-0 top-0 z-50 h-full w-full" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition duration-200"
                    enterFrom="bg-opacity-0"
                    enterTo="bg-opacity-50"
                    leave="transition duration-200"
                    leaveFrom="bg-opacity-50"
                    leaveTo="bg-opacity-0"
                >
                    <div className="flex h-full w-full items-center justify-center bg-gray-600 px-8">
                        <Transition.Child
                            as={Fragment}
                            enter="transition duration-200"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition duration-200"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <Dialog.Panel
                                as="div"
                                className={twMerge(
                                    'max-h-[90%] min-h-[150px] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-4 md:p-6',
                                    className,
                                )}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

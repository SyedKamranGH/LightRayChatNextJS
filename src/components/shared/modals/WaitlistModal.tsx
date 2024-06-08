import Link from 'next/link'
import { Modal } from './Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '..'

type TProps = {
    showModal: boolean
    onClose: () => void
}
const googleFormLink = 'https://forms.gle/GnWzXbL9Bp69p5URA'

export const WaitlistModal = ({ showModal, onClose }: TProps) => {
    return (
        <Modal showModal={showModal} onClose={onClose} className="max-w-md px-0 md:px-0">
            <div className="border-b">
                <div className="flex-between flex px-4 pb-4 md:px-6">
                    <h2 className="base-regular">🚀 Let&apos;s get started!</h2>
                    <button className="p-1" onClick={onClose}>
                        <AiOutlineClose className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col px-4 md:px-6">
                <div className="paragraph-regular pb-[30px] pt-[20px]">
                    Sign up to access advanced tools for insights and engagement.
                    <br />
                    <br />
                    Secure your spot in the world of innovation!
                </div>

                <Link href="/signup" className="mb-2">
                    <Button
                        variant="primary"
                        className="body-regular w-full flex-1 rounded-lg px-5 py-3"
                    >
                        Sign Up
                    </Button>
                </Link>
                <Link href="/login">
                    <Button className="body-regular w-full flex-1 rounded-lg px-5 py-3">
                        Log In
                    </Button>
                </Link>
            </div>
        </Modal>
    )
}

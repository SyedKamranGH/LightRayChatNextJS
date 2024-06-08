import { Modal } from './Modal'

type TProps = {
    showModal: boolean
    onClose: () => void
}

export const DisclaimerModal = ({ showModal, onClose }: TProps) => {
    return (
        <Modal showModal={showModal} className="max-w-md px-0 md:px-0">
            <div className="border-b px-4 md:px-6">
                <div className="flex-start flex gap-2 pb-4">
                    <span className="font-montserrat">⚠️</span>
                    <h2 className="base-regular">Always Check the Fact</h2>
                </div>
            </div>

            <div className="px-4 md:px-6">
                <div className="paragraph-regular pb-[30px] pt-[20px]">
                    AI can misunderstand too!
                    <br />
                    <br />
                    Generated responses may be inaccurate, and should always be cross-checked with
                    the provided sources.
                </div>

                <button
                    className="body-regular w-full rounded-lg bg-black px-5 py-3 text-white"
                    onClick={onClose}
                >
                    Okay, I Understand
                </button>
            </div>
        </Modal>
    )
}

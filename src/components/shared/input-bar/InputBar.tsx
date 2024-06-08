import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEventHandler, ElementRef, useRef, useState, type FormEvent } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

import type { useSendFile } from '@/hooks/useSendFile'
import type { useSendMessage } from '@/hooks/useSendMessage'
import type { TChatType } from '@/queries/chat.types'

import { resizeTextArea } from '@/utils/html'
import { submitFormOnEnter } from '@/utils/keyboard'
import { Footer } from '../Footer'
import { LoadingIcon } from '../icons'
import { WithTooltip } from '../tooltips/WithTooltip'

type TProps = {
    sendMessage: ReturnType<typeof useSendMessage>['mutate']
    chatId?: string
    isLoading?: boolean
    chatType?: TChatType
} & (
    | { enableUpload?: false }
    | { enableUpload: true; sendFile: ReturnType<typeof useSendFile>['mutate'] }
)

export const InputBar = (props: TProps) => {
    const { chatId, isLoading, sendMessage, enableUpload } = props

    const router = useRouter()
    const { chatType } = router.query as { chatType: TChatType | undefined }

    const hiddenFileInput = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState('')

    const textAreaRef = useRef<ElementRef<'textarea'>>(null)
    const formRef = useRef<ElementRef<'form'>>(null)

    const resetInput = () => {
        setInput('')

        if (hiddenFileInput.current?.value) {
            hiddenFileInput.current.files = null
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (input.length > 0) {
            sendMessage({ message: input, chatId, chatType: chatType || props.chatType })
            textAreaRef.current!.style.height = '50px'
        }

        resetInput()
    }

    const onFilesInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        e.preventDefault()

        const files = hiddenFileInput.current?.files

        // Check how many files were uploaded
        if (files && files.length > 0 && enableUpload) {
            if (files && files.length > 5) {
                toast('We will upload first 5 files.')
            }

            props.sendFile({ files: Array.from(files).slice(0, 5), chatId })
        }

        resetInput()
    }

    return (
        <div className="bottom-0 left-0 h-fit w-[calc(100%-.5rem)] bg-input-bar-gradient px-2">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-3xl flex-1 items-end overflow-auto rounded-full border border-primary-700 bg-grey-700 pl-[24px]"
            >
                {enableUpload && (
                    <>
                        <input
                            ref={hiddenFileInput}
                            type="file"
                            className="hidden"
                            accept=".doc,.docx,.pdf,.txt"
                            multiple
                            onChange={onFilesInputChange}
                        />

                        <button
                            disabled={isLoading}
                            onClick={() => hiddenFileInput.current?.click()}
                        >
                            <WithTooltip tooltipText="Upload pdf, docs, txt files up to 5. Max size 20MB each.">
                                <FiPlus className="mb-[10px] justify-center" size={32} />
                            </WithTooltip>
                        </button>
                    </>
                )}

                <textarea
                    id="chat-input-box"
                    ref={textAreaRef}
                    name="query"
                    value={input}
                    onChange={e => setInput(e.currentTarget.value)}
                    placeholder="Type here..."
                    className={twMerge(
                        'paragraph-medium md:base-medium',
                        // We disabled the manual resizing option and set the initial height.
                        // When the user types, and it exceeds the current line, the scroll even
                        'h-[50px] max-h-[150px] min-h-[50px] w-full py-[10px] sm:max-h-[200px]',
                        'ring-none resize-none outline-none',
                        'bg-transparent',
                        'ml-[8px]',
                    )}
                    onInput={resizeTextArea(textAreaRef)}
                    onKeyDown={submitFormOnEnter(formRef)}
                />

                <div className="mx-[14px] mb-[16px] flex items-center">
                    {isLoading ? (
                        <LoadingIcon className="text-black" />
                    ) : (
                        <button type="submit">
                            <Image src="/assets/icons/send.svg" width={24} height={24} alt="send" />
                        </button>
                    )}
                </div>
            </form>

            <Footer />
        </div>
    )
}

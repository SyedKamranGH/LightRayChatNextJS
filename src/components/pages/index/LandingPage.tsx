import { Switch, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiPlus } from 'react-icons/fi'
import { IoFlash } from 'react-icons/io5'
import { twJoin, twMerge } from 'tailwind-merge'

import { Footer } from '@/components/shared/Footer'
import { WithTooltip } from '@/components/shared/tooltips/WithTooltip'
import type { useSendFile } from '@/hooks/useSendFile'
import type { useSendMessage } from '@/hooks/useSendMessage'
import { random } from '@/lib/random'
import { SuggestionItem } from '@/pages/news-listener/listen'
import { TChatType } from '@/queries/chat.types'

const prompts = random.choice([
    'Conduct a risk assessment for a company',
    'Run a credit check on the company',
    'Adverse news on the Company',
    'Shareholding pattern of the company',
    'Check if my portfolio companies are involved in any legal cases',
    'Any negative news on the person',
    'Are any sanctions imposed on the company',
    'Does this company have an offshore account',
    'Are any sanctions imposed on the person',
    'Shareholding pattern of an individual within the company',
    'Who is the  ultimate beneficial owner of the company',
    'Is this person associated with an offshore account',
    'Last 3 years key financials of the company',
    'What are the investments made by the person',
    'Court cases of the person',
    'Is this person politically exposed',
])

type TLandingPageProps = {
    sendMessage: ReturnType<typeof useSendMessage>['mutate']
    sendFile: ReturnType<typeof useSendFile>['mutate']
    isLoading: boolean
    searchType?: TSearchType
}

type TSearchType = 'repository' | 'google' | 'file' | 'NEWS_LISTENER' | 'CREDIT_SAFE' | 'UNICOURT'

export const LandingPage: React.FC<TLandingPageProps> = ({
    sendMessage,
    sendFile,
    isLoading,
    searchType: searchTypeProps = 'google',
}) => {
    const [input, setInput] = useState('')
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [showSuggestions, setShowSuggestions] = useState(false)
    const [searchType, setSearchType] = useState<TSearchType>(searchTypeProps)

    const onDropAccepted = useCallback(
        (chosenFiles: File[]) => {
            if (chosenFiles.length < 1) return
            sendFile({ files: chosenFiles.slice(0, 5) })
        },
        [sendFile],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'application/*': ['.pdf', '.doc', '.docx'],
            'text/plain': ['.txt'],
        },
        onDropAccepted,
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        let chatType: TChatType = 'NORMAL'
        if (searchType === 'google') chatType = 'SEARCH'
        if (searchType === 'NEWS_LISTENER') chatType = 'NEWS_LISTENER'
        if (searchType === 'CREDIT_SAFE') chatType = 'CREDIT_SAFE_SEARCH'
        if (searchType === 'UNICOURT') chatType = 'UNICOURT_SEARCH'

        if (input.length > 0) sendMessage({ message: input, chatType })
    }

    return (
        <div {...getRootProps()} className="relative h-full w-full overflow-y-auto py-[30px]">
            <input {...getInputProps()} ref={hiddenFileInput} />
            <div
                className={twMerge('fixed inset-0 bg-black/30', !isDragActive && 'hidden')}
                aria-hidden={true}
            />

            <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-between px-5 max-lg:pt-5 md:px-20">
                <div className="flex flex-1 flex-col justify-start gap-4 md:mt-24">
                    <div className="flex h-full flex-col justify-center gap-4">
                        <h1
                            className="h3-medium sm:h1-medium py-5 text-center font-title sm:text-5xl md:-mt-20 md:py-10"
                            // style={{
                            //     backgroundImage: `url('https://lightray.ai/images/bg-grid.svg')`,
                            //     backgroundPositionX: 'center',
                            //     backgroundPositionY: 'center',
                            // }}
                        >
                            Effortless Data Driven Insights
                        </h1>

                        <div className="min-h-[300px] md:px-20">
                            <div className="flex w-full flex-col justify-center rounded-full border border-primary-700 bg-transparent px-4">
                                <form
                                    className="relative flex items-center gap-2 py-1"
                                    onSubmit={handleSubmit}
                                >
                                    <button
                                        onClick={() => hiddenFileInput.current?.click()}
                                        type="button"
                                    >
                                        <WithTooltip tooltipText="Upload pdf, docs, txt files up to 5. Max size 20MB each.">
                                            <FiPlus className="justify-center" size={30} />
                                        </WithTooltip>
                                    </button>
                                    <input
                                        type="text"
                                        name="query"
                                        value={input}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setShowSuggestions(false)}
                                        onChange={e => setInput(e.currentTarget.value)}
                                        placeholder="Type your questions here..."
                                        className="paragraph-regular flex-1 bg-transparent py-2 outline-none placeholder:text-black/50"
                                        autoComplete="off"
                                    />
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <DataSourceSwitch onClick={setSearchType} />
                                        <div className="h-5 w-5">
                                            <button type="submit">
                                                <Image
                                                    src="/assets/icons/send.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="send"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <Transition
                                show={showSuggestions}
                                enter="duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="mt-4 flex flex-col justify-start gap-4 bg-white px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <IoFlash className="fill-primary-700" />
                                        <p className="font-medium">Suggestions:</p>
                                    </div>
                                    {prompts.map(item => (
                                        <SuggestionItem key={item} onClick={() => setInput(item)}>
                                            {item}
                                        </SuggestionItem>
                                    ))}
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Dropzone overlay */}
            <div
                className={twMerge(
                    'flex-center absolute left-0 top-0 flex h-full w-full rounded-lg bg-primary-700/50 hover:border-primary-300',
                    !isDragActive && 'hidden',
                )}
            >
                <span>Drop your file here</span>
            </div>
        </div>
    )
}

const DataSourceSwitch = (props: { onClick: (state: TSearchType) => void }) => {
    const { onClick } = props
    const [enabled, setEnabled] = useState(false)

    const handleOnChange = (checked: boolean) => {
        onClick(checked ? 'repository' : 'google')
        setEnabled(checked)
    }

    return (
        <div className="flex flex-col gap-x-2 sm:flex-row">
            <Switch
                checked={enabled}
                onChange={handleOnChange}
                className={twJoin(
                    'relative mt-[0.5rem] inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:mt-0',
                )}
            >
                <span
                    aria-hidden="true"
                    className={twMerge(
                        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                        enabled ? 'translate-x-[18px] bg-primary-700' : 'translate-x-1 bg-gray-300',
                    )}
                />
            </Switch>
            <p
                className={twMerge(
                    'text-[0.5rem] duration-200 sm:text-base',
                    enabled ? 'text-primary-700' : 'text-gray-300',
                )}
            >
                Repository
            </p>
        </div>
    )
}

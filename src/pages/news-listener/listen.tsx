import { Layout, Message, TMessageBox } from '@/components/shared'
import { LoadingIcon } from '@/components/shared/icons'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { IoFlash } from 'react-icons/io5'
import { useRouter } from 'next/router'

import { ChatHeading } from '@/components/pages/chat'
import { TrendingIcon } from '@/components/shared/icons/TrendingIcon'
import { getSuggestedTopics, registerNewsHeadlines } from '@/queries/news-listener'
import { replaceLast } from '@/utils/array'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const suggestionItems = [
    'Fintech Innovations Redefining Banking: The Rise of Digital-First Financial Services',
    'Inflation Worries Continue: Central Banks Respond as Prices Rise',
    'Global Trade Shifts: Implications of New Trade Agreements',
]

type TProps = {
    sendMessage: (message: string) => void
    isLoading: boolean
    isDisabled: boolean
}

export const InputBar = ({ sendMessage, isLoading = false, isDisabled = false }: TProps) => {
    const [input, setInput] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(true)

    const resetInput = () => {
        setInput('')
    }

    const chooseSuggestion = (choice: string) => {
        setInput(choice)
        setShowSuggestions(false)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (input.length > 0) {
            sendMessage(input)
        }
        resetInput()
    }

    useEffect(() => {
        if (input === '') {
            setShowSuggestions(true)
        }
    }, [input])

    return (
        <div className="absolute bottom-0 left-0 h-fit w-full bg-input-bar-gradient px-2">
            <div className="mx-auto mb-10 mt-6 flex max-w-4xl flex-1 flex-col lg:justify-center">
                {showSuggestions && (
                    <div className="flex flex-col justify-start gap-y-4 rounded-lg border border-grey-300 bg-white p-6 sm:p-8">
                        <div className="flex items-center gap-x-3">
                            <IoFlash />
                            <p className="font-medium">Suggested News:</p>
                        </div>
                        {suggestionItems.map(item => (
                            <SuggestionItem key={item} onClick={() => chooseSuggestion(item)}>
                                {item}
                            </SuggestionItem>
                        ))}
                    </div>
                )}

                <form
                    className="flex w-full gap-2 rounded-[5px] border border-[#929292] bg-[#F3F5F6] px-[30px] py-[20px]"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="query"
                        value={input}
                        onChange={e => setInput(e.currentTarget.value)}
                        placeholder="Type your interested news here to create a news listener"
                        className="ring-none paragraph-medium md:base-medium w-full bg-transparent outline-none"
                        disabled={isDisabled}
                    />
                    {isLoading ? (
                        <LoadingIcon className="text-black" />
                    ) : (
                        <button type="submit">
                            <Image src="/assets/icons/send.svg" width={24} height={24} alt="send" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export const SuggestionItem = ({
    children,
    onClick,
}: {
    children: React.ReactNode
    onClick?: () => void
}) => (
    <div className="flex items-center gap-x-3">
        <TrendingIcon />
        <button className="w-fit text-left" onClick={onClick}>
            {children}
        </button>
    </div>
)

export default function NewsTopic() {
    useProtectRoute()

    const router = useRouter()
    const [newChat, setNewChat] = useState<TMessageBox[]>([])

    const getSuggestTopicsMutation = useMutation({
        mutationKey: [getSuggestedTopics.mutationKey],
        mutationFn: (message: string) => {
            setNewChat(prev => [
                ...prev,
                { role: 'user', content: message },
                { role: 'system', content: '' },
            ])

            return getSuggestedTopics.mutationFn(message)
        },
        onSuccess: ({ message }) => {
            setNewChat(prev => replaceLast(prev, message))
        },
    })

    const registerNewsHeadlinesMutation = useMutation({
        mutationKey: [registerNewsHeadlines.mutationKey],
        mutationFn: (headlines: string[]) => {
            setNewChat(prev => [...prev, { role: 'system', content: '' }])
            return registerNewsHeadlines.mutationFn({ headlines })
        },
        onSuccess: message => {
            setNewChat(prev => replaceLast(prev, message))
            router.push(`/news-listener/${message.chatId}`)
        },
    })

    const isLoading = getSuggestTopicsMutation.isLoading || registerNewsHeadlinesMutation.isLoading

    return (
        <Layout>
            <section className="relative flex h-full w-full flex-col overflow-hidden sm:pt-12">
                {newChat.length === 0 ? (
                    <>
                        <div className="mx-auto max-w-4xl px-4">
                            <h1 className="max-lg:h4-medium h1-medium mt-16">
                                News Buzz: Stay Informed Effortlessly! 🌐{' '}
                            </h1>
                            <div className="">What new would you like be notified?</div>
                        </div>
                        <InputBar
                            sendMessage={getSuggestTopicsMutation.mutate}
                            isLoading={isLoading}
                            isDisabled={newChat.length > 0}
                        />
                    </>
                ) : (
                    <>
                        <ChatHeading title="News Listener" chatId="" />
                        <div className="flex flex-1 flex-col items-start divide-y overflow-y-auto">
                            {newChat.map((message, index) => (
                                <Message
                                    message={message}
                                    key={index}
                                    isLoading={isLoading}
                                    onChoicePrompt={registerNewsHeadlinesMutation.mutate}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </Layout>
    )
}

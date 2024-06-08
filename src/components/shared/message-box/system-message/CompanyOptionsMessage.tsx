import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Snag } from 'snag'

import { ChatContainer } from '@/components/shared'
import { useChatContext } from '@/hooks/chat.context'
import { TRegisterCompanyRequest, registerCompany } from '@/queries/credit-safe'
import {
    TCompanyChoice,
    getChatMessages,
    type TCompanyOptionsSystemMessage,
    type TSystemMessage,
} from '@/queries/messages'
import { MarkdownMessage } from '../MarkdownMessage'
import { AIProfile } from './AIProfile'
import { twMerge } from 'tailwind-merge'
import { CompanyRequestFormMessage } from './CompanyRequestFormMessage'
import { CompanyOptionCard } from './cards/CompanyOptionCard'

const NUMBER_OF_RESULTS_TO_SHOW = 3

interface ICompanyOptionsSystemMessageProps {
    message: TCompanyOptionsSystemMessage
}

/**
 * Company Options system message is intended to allow our system to communicate with
 * users in a more interactive way.
 *
 * We have three attributes.
 *
 * options - System generated company options for the user to choose
 * selectedOptions - User selected one of the company from the original options
 * confirmed - If set to true, user already chose the options
 *
 * By keeping both `options` and `selectedOptions`, we can analyze user behavior in future.
 */
export const CompanyOptionsSystemMessage = (props: ICompanyOptionsSystemMessageProps) => {
    const { message } = props
    const [selectedOptions, setSelectedOptions] = useState(message.metadata.selectedOptions)
    const confirmed = selectedOptions.length > 0

    message.metadata.selectedOptions = selectedOptions

    if (confirmed) {
        return <SelectedOptions message={message} />
    }

    return (
        <OptionsToSelect
            message={message}
            onSelect={selectedOption => setSelectedOptions([selectedOption])}
        />
    )
}

const OptionsToSelect = (props: {
    message: TCompanyOptionsSystemMessage
    onSelect: (
        selectedOption: TCompanyOptionsSystemMessage['metadata']['selectedOptions'][number],
    ) => void
}) => {
    const { message, onSelect } = props
    const { content, metadata, userQuery } = message
    const { options } = metadata

    const searchParams = useSearchParams()
    const chatId = searchParams?.get('chatId')

    const queryClient = useQueryClient()

    const abortControllerRef = useRef(new AbortController())
    const { newChat, setNewChat, updateLastMessage, removeLastMessageOnError } = useChatContext()

    const hasManyOptions = options.length > NUMBER_OF_RESULTS_TO_SHOW
    const [showAllOptions, setShowAllOptions] = useState(!hasManyOptions)

    const { mutate } = useMutation({
        mutationKey: [registerCompany.mutationKey],
        mutationFn: (selectedOption: (typeof options)[number]) => {
            onSelect(selectedOption)

            const emptySystemMessage: TSystemMessage = {
                role: 'system',
                content: '',
            }
            setNewChat(prev => [...prev, emptySystemMessage])

            if (!chatId) {
                const message = 'Something went wrong. Please refresh and try again.'
                toast.error(message)
                throw new Snag({ message })
            }

            const payload: TRegisterCompanyRequest = {
                chatId,
                selectedCompany: {
                    companyId: selectedOption.companyId,
                    name: selectedOption.name,
                    source: selectedOption.source,
                    address: { postalCode: selectedOption.postalCode },
                },
            }

            return registerCompany.mutationFn(
                payload,
                abortControllerRef.current.signal,
                response => {
                    updateLastMessage(response.message)
                },
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries([getChatMessages.queryKey, chatId])
        },
        onError: () => {
            removeLastMessageOnError()
            toast.error(
                'Something went wrong while finding the selected company. Please try again.',
            )
        },
    })

    const normalCompaniesOptions = options.filter(
        option => option.branch_status !== 'branch of an out-of-jurisdiction company',
    )

    const outOfJurisdictionCompaniesOptions = options.filter(
        option => option.branch_status === 'branch of an out-of-jurisdiction company',
    )

    const reorderedOptions = [...normalCompaniesOptions, ...outOfJurisdictionCompaniesOptions]

    const DisplayOptions = (props: { options: TCompanyChoice[] }) => {
        const normalCompaniesOptions = props.options.filter(
            option => option.branch_status !== 'branch of an out-of-jurisdiction company',
        )

        const outOfJurisdictionCompaniesOptions = props.options.filter(
            option => option.branch_status === 'branch of an out-of-jurisdiction company',
        )

        return (
            <ul className="ml-[45px] grid grid-cols-3">
                {normalCompaniesOptions.map((option, index) => (
                    <Option key={index} option={option} onClick={() => mutate(option)} />
                ))}

                {outOfJurisdictionCompaniesOptions.length > 0 && (
                    <>
                        <hr className="my-4" />

                        <p className="mb-3 ml-[45px] font-medium">
                            Here are the companies those registered addresses are out of
                            jurisdiction.
                        </p>

                        {outOfJurisdictionCompaniesOptions.map((option, index) => (
                            <Option key={index} option={option} onClick={() => mutate(option)} />
                        ))}
                    </>
                )}
            </ul>
        )
    }

    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-6">
                <AIProfile />

                {content && (
                    <div className="ml-[45px]">
                        <MarkdownMessage content={content} />
                    </div>
                )}

                {showAllOptions ? (
                    <DisplayOptions options={reorderedOptions} />
                ) : (
                    <DisplayOptions
                        options={reorderedOptions.slice(0, NUMBER_OF_RESULTS_TO_SHOW)}
                    />
                )}

                {hasManyOptions && !showAllOptions && (
                    <button
                        className="ml-[45px] w-fit text-[#4267B2]"
                        onClick={() => setShowAllOptions(true)}
                    >
                        Show more
                    </button>
                )}
            </div>
        </ChatContainer>
    )
}

const Option = (props: {
    option: TCompanyOptionsSystemMessage['metadata']['options'][number] & { description?: string }
    onClick?: () => void
    disabled?: boolean
}) => {
    const { option, onClick, disabled } = props

    let statusColorClass = ''

    if (option.status === 'Active') {
        statusColorClass = 'text-green-500'
    } else {
        statusColorClass = 'text-red-500'
    }

    const handleClick = () => {
        if (disabled) {
            return
        }

        if (onClick) {
            onClick()
        }
    }

    if (disabled) {
        return (
            <li className="rounded-sm bg-gray-300 bg-opacity-10 px-2 py-1">
                <p className="font-medium text-gray-400">{option.name}</p>
            </li>
        )
    }

    return (
        <li onClick={handleClick}>
            <CompanyOptionCard company={option} />
        </li>
    )
}

const SelectedOptions = (props: { message: TCompanyOptionsSystemMessage }) => {
    const { message } = props
    const { content, metadata } = message
    const { options, selectedOptions } = metadata

    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-6">
                <AIProfile />

                {/* <ul className="ml-[45px] grid grid-cols-3">
                    {options.slice(0, NUMBER_OF_RESULTS_TO_SHOW).map((option, index) => (
                        <Option key={index} option={option} disabled />
                    ))}

                    {options.length > NUMBER_OF_RESULTS_TO_SHOW && (
                        <Option
                            option={{
                                // We just need name here to display the option.
                                // Other properties are to satisfy the typing.
                                companyId: '',
                                name: `${options.length - NUMBER_OF_RESULTS_TO_SHOW} other options`,
                                description: '',
                                source: 'CREDIT_SAFE',
                                address: '',
                                postalCode: '',
                            }}
                            disabled
                        />
                    )}
                </ul> */}
                {content && (
                    <div className="ml-[45px]">
                        <p>You have chosen following company:</p>
                    </div>
                )}
                <ul className="ml-[45px] flex flex-col gap-3">
                    {selectedOptions.map((option, index) => (
                        <li key={index}>
                            <CompanyOptionCard company={option} />
                        </li>
                    ))}
                </ul>
            </div>
        </ChatContainer>
    )
}

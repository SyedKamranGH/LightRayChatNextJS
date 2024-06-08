import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { ButtonWithLoader, ChatContainer } from '@/components/shared'
import { LoadingIcon } from '@/components/shared/icons'
import { MarkdownMessage } from '@/components/shared/message-box/MarkdownMessage'
import { AIProfile } from '@/components/shared/message-box/system-message/AIProfile'
import type { TUniCourtCaseOptionsSystemMessage } from '@/queries/messages'
import axiosInstance from '@/utils/axios'

const NUMBER_OF_RESULTS_TO_SHOW = 3

interface IUniCourtCaseOptionsSystemMessage {
    message: TUniCourtCaseOptionsSystemMessage
}

export const UniCourtCaseOptionsSystemMessage = (props: IUniCourtCaseOptionsSystemMessage) => {
    const { message } = props
    const { content, metadata } = message
    const { options } = metadata

    const hasManyOptions = options.length > NUMBER_OF_RESULTS_TO_SHOW
    const [showAllOptions, setShowAllOptions] = useState(!hasManyOptions)

    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-6">
                <AIProfile />

                {content && <MarkdownMessage content={content} />}

                <ul className="flex flex-col gap-6">
                    {(showAllOptions ? options : options.slice(0, NUMBER_OF_RESULTS_TO_SHOW)).map(
                        (option, index) => (
                            <Option key={index} option={option} />
                        ),
                    )}
                </ul>

                {hasManyOptions && !showAllOptions && (
                    <button
                        className="w-fit text-[#4267B2]"
                        onClick={() => setShowAllOptions(true)}
                    >
                        Show more
                    </button>
                )}

                <SeeCasesButtons
                    showSeeActiveCases={Boolean(
                        options.find(option => option.caseStatus === 'Open'),
                    )}
                />
            </div>
        </ChatContainer>
    )
}

const Option = (props: {
    option: TUniCourtCaseOptionsSystemMessage['metadata']['options'][number] & {
        description?: string
    }
}) => {
    const { option } = props

    const searchParams = useSearchParams()
    const chatId = searchParams?.get('chatId')

    const [isLoadingPDF, setIsLoadingPDF] = useState(false)

    const displayCasePDF = async () => {
        setIsLoadingPDF(true)

        const response = await axiosInstance.post<string>(
            '/v1/lightray/unicourt/pdf/case/',
            {
                chatId,
                selectedCase: option,
            },
            { responseType: 'blob' },
        )

        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url, '_blank')

        setIsLoadingPDF(false)
    }

    return (
        <li>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <p
                        className="cursor-pointer font-medium capitalize text-[#4267B2]"
                        onClick={displayCasePDF}
                    >
                        {option.name}
                    </p>
                    {isLoadingPDF && <LoadingIcon className="text-black" />}
                </div>

                <p>
                    Case No: {option.caseNumber}, Case Status: {option.caseStatus}
                </p>
            </div>
        </li>
    )
}

const SeeCasesButton = (props: { url: string; label: string }) => {
    const { url: casesUrl, label } = props

    const searchParams = useSearchParams()
    const chatId = searchParams?.get('chatId')

    const [isLoadingPDF, setIsLoadingPDF] = useState(false)

    const displayActiveCasesPDF = async () => {
        setIsLoadingPDF(true)

        const response = await axiosInstance.post<string>(
            casesUrl,
            {
                chatId,
            },
            { responseType: 'blob' },
        )

        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url, '_blank')

        setIsLoadingPDF(false)
    }

    return (
        <ButtonWithLoader
            isLoading={isLoadingPDF}
            variant="primary"
            className="w-fit px-4"
            onClick={displayActiveCasesPDF}
        >
            <p>{label}</p>
        </ButtonWithLoader>
    )
}

const SeeCasesButtons = (props: { showSeeActiveCases: boolean }) => {
    const { showSeeActiveCases } = props

    return (
        <div className="mt-4 flex gap-4">
            {showSeeActiveCases && (
                <SeeCasesButton
                    label="See Active Cases"
                    url="/v1/lightray/unicourt/pdf/active-cases/"
                />
            )}
            <SeeCasesButton label="See All Cases" url="/v1/lightray/unicourt/pdf/all-cases/" />
        </div>
    )
}

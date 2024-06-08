import Image from 'next/image'
import { FormEvent, useState } from 'react'

import { ChatContainer } from '@/components/shared'
import type { TChoicePromptSystemMessage } from '@/queries/messages'

import { MarkdownMessage } from '../MarkdownMessage'
import { AIProfile } from './AIProfile'

interface IOptionProps {
    label: string
}

export const ConfirmedPromptOption = ({ label }: IOptionProps) => {
    return (
        <div className="flex gap-3 rounded bg-neutral-100 px-[15px] py-[8px]">
            <div className="flex-shrink-0 cursor-pointer">
                {/* TODO :: make the icon more generic and not tied to news flash icon */}
                <Image src="/assets/icons/flash.svg" width={22} height={22} alt="Flash Icon" />
            </div>
            <label>{label}</label>
        </div>
    )
}

export const ChoicePromptOption = ({ label }: IOptionProps) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <div className="mt-1 flex cursor-pointer gap-2" onClick={() => setIsChecked(!isChecked)}>
            <div className="flex-shrink-0">
                {isChecked ? (
                    <Image
                        src="/assets/icons/checked.svg"
                        width={22}
                        height={22}
                        alt="Checked Icon"
                    />
                ) : (
                    <Image
                        src="/assets/icons/unchecked.svg"
                        width={22}
                        height={22}
                        alt="Unchecked Icon"
                    />
                )}
            </div>

            <input
                name="options[]"
                type="checkbox"
                value={label}
                onChange={e => setIsChecked(e.target.checked)}
                checked={isChecked}
                hidden
            />

            <label>{label}</label>
        </div>
    )
}

interface IChoicePromptSystemMessageProps {
    message: TChoicePromptSystemMessage
    isLoading?: boolean
    onSubmit?: (selectedOptions: string[]) => void
}

/**
 * Choice Prompt system message is intenteded to allow our system to communicate with
 * users in a more interactive way.
 *
 * We have three attributes.
 *
 * options - System generated options for the user to choose
 * selectedOptions - User selected options from the original options ( selectedOptions ⊆ options )
 * confirmed - If set to true, user already choosed the options
 *
 * By keeping both `options` and `selectedOptions`, we can analyse user behaviour in future.
 */
export const ChoicePromptSystemMessage = (props: IChoicePromptSystemMessageProps) => {
    const { message } = props
    const { content, metadata } = message
    const { options, selectedOptions, confirmed } = metadata

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!props.onSubmit) return

        // The 'currentTarget' property of the event is used for type safety instead of 'target'
        const formElements = event.currentTarget.elements

        // Typecasting 'formElements' to 'HTMLFormControlsCollection' for proper iteration
        const inputs = formElements as HTMLFormControlsCollection

        // Convert HTMLFormControlsCollection to an array and filter checkboxes.
        // Get the id of the checked checkbox
        const checkedValues = Array.from(inputs)
            .filter(
                (element): element is HTMLInputElement =>
                    element.tagName === 'INPUT' && 'type' in element && element.type === 'checkbox',
            )
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)

        props.onSubmit(checkedValues)
    }

    return (
        <ChatContainer>
            <div className="flex flex-1 flex-col justify-start gap-6">
                <AIProfile />

                {content && <MarkdownMessage content={content} />}

                {confirmed ? (
                    <ul className="flex flex-col gap-3">
                        {selectedOptions.map((option, index) => {
                            return <ConfirmedPromptOption label={option} key={index} />
                        })}
                    </ul>
                ) : (
                    <form
                        className="flex flex-col gap-4 rounded-[5px] border px-3 py-4 shadow-sm"
                        onSubmit={onSubmit}
                    >
                        <ul className="flex flex-col gap-3">
                            {options.map((option, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <ChoicePromptOption label={option} />
                                </li>
                            ))}
                        </ul>

                        <button
                            type="submit"
                            className="flex w-fit gap-2 rounded-md bg-[#F5F5F8] px-[15px] py-[8px]"
                        >
                            {/* TODO:: make the icon button customizable */}
                            <Image src="/assets/icons/flash.svg" width={20} height={20} alt="" />
                            Confirm
                        </button>
                    </form>
                )}
            </div>
        </ChatContainer>
    )
}

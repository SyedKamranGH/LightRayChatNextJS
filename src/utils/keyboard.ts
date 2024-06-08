import { KeyboardEventHandler, RefObject } from 'react'

export const submitFormOnEnter = (
    formRef: RefObject<HTMLFormElement>,
): KeyboardEventHandler<HTMLTextAreaElement> => {
    return e => {
        // If user clicks shift + enter, ignore
        // If only enter key was pressed, submit the form
        if (e.shiftKey === false && formRef.current !== null && e.key === 'Enter') {
            e.preventDefault()
            formRef.current.requestSubmit()
        }
    }
}

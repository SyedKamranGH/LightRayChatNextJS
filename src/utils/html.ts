import { RefObject } from 'react'

export function resizeTextArea(textAreaRef: RefObject<HTMLTextAreaElement>) {
    return () => {
        if (textAreaRef.current) {
            // We are utilizing scrollHeight + max height to auto grow the textbox.
            // In case user deletes the current text inside the text box,
            // previous scrollHeight will remain the same. This will make the textbox height stucked at
            // large value rather than shrinking it down.
            // Hence, we reset to original value - 50px.
            textAreaRef.current.style.height = '50px'
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
        }
    }
}

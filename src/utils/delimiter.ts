type TDelimiters = '||NEW_MESSAGE_BUBBLE||' // to indicate that we should start a new message bubble

export const hasDelimiter = (content: string, delimiter: TDelimiters) => content.includes(delimiter)

export const splitByDelimiter = (content: string, delimiter: TDelimiters) => {
    const chunks = content.split(delimiter)

    // splitting by a delimiter and create an empty string if the string starts with the delimiter
    // E.g: '||delimiter|| the string'.split('||delimiter||') => ['', ' the string']
    // In this case, we want to throw it away
    if (chunks[0].length === 0) chunks.shift()

    return chunks
}

export const removeDelimiter = (content: string, delimiter: TDelimiters) => {
    return content.replace(delimiter, '')
}

import {
    IChatCompletionResponse,
    TChatCompletionStreamResponse,
    TCitationRef,
} from '@/queries/chat'

export const formatStreamResponse = (data: string) => {
    const responses = data
        .trim()
        .split('\n')
        .map(line => {
            // TODO: Update the type to cover credit safe response of a list of companies
            return JSON.parse(line) as TChatCompletionStreamResponse
        })

    let content: string = ''
    let citations: TCitationRef[] = []
    let message = {}

    for (const res of responses) {
        if (res.object === 'error') {
            throw res.error
        }

        if (res.delta && 'content' in res.delta) {
            content += res.delta.content
        }

        if (res.delta && 'citations' in res.delta) {
            // there will be only one array of citations
            // so we don't need to append
            citations = res.delta.citations
        }

        // This is to handle the credit safe response (a list of companies).
        // This will not break other flows.
        if (typeof res.delta === 'object' && res.delta !== null) {
            message = res.delta
        }
    }

    if (responses[0].object === 'error') {
        throw responses[0].error
    }

    const completionResponse: IChatCompletionResponse = {
        id: responses[0].id,
        created: responses[0].created,
        model: responses[0].model,
        object: 'chat.completion',
        message: {
            ...message,
            role: 'system',
            content,
        },
    }

    if (citations.length > 0) {
        completionResponse.message.citations = citations
    }

    return completionResponse
}

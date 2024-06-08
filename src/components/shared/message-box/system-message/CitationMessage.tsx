import type { TCitationRef } from '@/queries/chat'
import { DocumentCitation } from './citations/DocumentCitation'
import { WebPageCitation } from './citations/WebPageCitation'

export const CitationMessage = ({ citations = [] }: { citations: TCitationRef[] | undefined }) => {
    if (citations.length < 1) return null

    return (
        <div className="flex w-full flex-grow-0 flex-wrap gap-1">
            {citations.map((citation, index) => {
                if (citation.citationType === 'WEB_PAGE') {
                    return <WebPageCitation key={index} url={citation.url} />
                }

                return (
                    <DocumentCitation
                        key={index}
                        url={citation.url}
                        citationFilename={citation.citationFilename}
                    />
                )
            })}
        </div>
    )
}

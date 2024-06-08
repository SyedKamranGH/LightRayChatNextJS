import Link from 'next/link'
import { FiClock } from 'react-icons/fi'

import { TNewsSystemMessage } from '@/queries/messages'
import { timeAgo } from '@/utils/formatDate'
import { ChatContainer } from '@/components/shared'

export const NewsSystemMessage = (props: { message: TNewsSystemMessage }) => {
    const { news } = props.message

    return (
        <ChatContainer>
            <div className="flex gap-1 rounded-md border p-[15px]">
                <div className="flex flex-col gap-5">
                    <p className="font-size-[12px] font-medium">{news.source.name.toUpperCase()}</p>

                    <div>
                        <Link
                            className="font-size-[16px] cursor-pointer font-semibold underline"
                            href={news.sourceUrl}
                            target="_blank"
                        >
                            {news.title}
                        </Link>
                        <p className="mt-2">{news.description}</p>
                    </div>

                    {news.publishedAt && (
                        <div className="flex items-center gap-1">
                            <FiClock />
                            <p> {timeAgo(news.publishedAt)}</p>
                        </div>
                    )}
                </div>

                {news.imageUrl && (
                    <picture>
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="h-full max-h-[200px] min-h-[200px] w-full min-w-[200px] max-w-[200px] rounded-md object-cover"
                        />
                    </picture>
                )}
            </div>
        </ChatContainer>
    )
}

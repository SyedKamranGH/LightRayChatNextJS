import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'

import styles from './MarkdownMessage.module.css'

interface IProps {
    content: string
}

export const MarkdownMessage: FC<IProps> = ({ content }) => {
    return (
        <ReactMarkdown
            className={`${styles.markdown} body-regular md:paragraph-regular w-auto max-w-3xl flex-wrap overflow-x-hidden break-words`}
            components={{
                a: ({ node, ...props }) => (
                    <a
                        className="font-semibold text-primary underline"
                        target="_blank"
                        {...props}
                    />
                ),
                table: ({ node, children, ...props }) => (
                    <div className="no-scrollbar h-fit w-full table-fixed overflow-auto py-3">
                        <table
                            {...props}
                            className="w-full border-collapse rounded-xl border-hidden"
                        >
                            {children}
                        </table>
                    </div>
                ),
                thead: ({ node, children, ...props }) => (
                    <thead {...props} className={styles.thead}>
                        {children}
                    </thead>
                ),
                tbody: ({ node, children, ...props }) => (
                    <tbody {...props} className={styles.tbody}>
                        {children}
                    </tbody>
                ),
                tr: ({ node, children, ...props }) => <tr {...props}>{children}</tr>,
                th: ({ node, children, ...props }) => (
                    <th
                        {...props}
                        className={twMerge('border border-gray-400/30 p-2 font-medium', styles.th)}
                    >
                        {children}
                    </th>
                ),
                td: ({ node, children, ...props }) => (
                    <td
                        {...props}
                        className="border border-gray-400/30 p-2 align-top text-sm leading-6"
                    >
                        {children}
                    </td>
                ),
                h1: ({ node, children, ...props }) => (
                    <h1 className="my-2 text-xl font-semibold" {...props}>
                        {children}
                    </h1>
                ),
                h2: ({ node, children, ...props }) => (
                    <h2 className="my-2 mt-8 font-semibold" {...props}>
                        {children}
                    </h2>
                ),
                h3: ({ node, children, ...props }) => (
                    <h3 className="font-medium capitalize" {...props}>
                        {children}
                    </h3>
                ),
                ul: ({ node, children, ...props }) => (
                    <ul className="ml-8 list-disc py-6" {...props}>
                        {children}
                    </ul>
                ),
                ol: ({ node, children, ...props }) => (
                    <ol className="ml-8 list-decimal py-6" {...props}>
                        {children}
                    </ol>
                ),
            }}
            remarkPlugins={[remarkGfm]}
            // @ts-ignore
            rehypePlugins={[rehypeRaw]}
        >
            {content}
        </ReactMarkdown>
    )
}

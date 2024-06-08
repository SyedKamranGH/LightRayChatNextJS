import { ChatOptionsMenu } from '@/components/shared'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { ChatDocuments } from '@/components/pages/chat/ChatDocuments'
import { TChatType } from '@/queries/chat.types'
import { twJoin } from 'tailwind-merge'
import Link from 'next/link'

type TProps = {
    chatId: string
    title: string
    chatType?: TChatType
    linkTabs: ILinkTabItemProps[]
}

interface ILinkTabItemProps {
    href: string
    title: string
}

const LinkTabItem = (props: ILinkTabItemProps) => {
    const { title, href } = props

    return (
        <Link href={href}>
            <h2 className="mb-[14px] line-clamp-1 text-sm font-semibold sm:text-base">{title}</h2>
            <div
                className={twJoin(
                    'h-1 rounded-[5px] ',
                    window.location.href.endsWith(href) && 'bg-primary-700',
                )}
            />
        </Link>
    )
}

export const ChatHeadingWithTabs = ({ title, chatId, chatType, linkTabs }: TProps) => {
    return (
        <div className="h-fit w-full border-b px-4 md:px-[30px]">
            <div className="mx-auto flex max-w-3xl flex-col">
                <div className="flex w-full shrink-0 items-center justify-between gap-4">
                    <span className="text-title line-clamp-1 text-ellipsis text-[18px] font-semibold">
                        {title}
                    </span>

                    {/* Should create own component, or refactor the menu to accept on success behavior */}
                    <div className="flex w-fit items-center justify-center gap-2">
                        {chatType === 'RESEARCH_FROM_DOCUMENT' ? (
                            <div className="block lg:hidden">
                                {/* <MobileUploadedFiles /> */}
                                <Sheet>
                                    <SheetTrigger>
                                        <AiOutlineFolderOpen />
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <ChatDocuments chatId={chatId} />
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        ) : null}
                        <span className="h-6">
                            <ChatOptionsMenu title={title} chatId={chatId} />
                        </span>
                    </div>
                </div>

                {linkTabs && (
                    <div className="mt-[53px] flex gap-[45px]">
                        {linkTabs.map(({ href, title }, index) => (
                            <LinkTabItem href={href} title={title} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

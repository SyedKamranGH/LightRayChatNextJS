import { ChatOptionsMenu } from '@/components/shared'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { ChatDocuments } from '@/components/pages/chat/ChatDocuments'
import { TChatType } from '@/queries/chat.types'

type TProps = {
    chatId: string
    title: string
    chatType?: TChatType
}

export const ChatHeading = ({ title, chatId, chatType }: TProps) => {
    return (
        <div className="h-fit w-full border-b p-4 pb-6 sm:py-[30px] md:px-[30px]">
            <div className="mx-auto flex max-w-3xl">
                <div className="flex w-full shrink-0 items-center justify-between gap-4">
                    <span className="text-title line-clamp-1 text-ellipsis text-[18px] font-semibold sm:text-[25px] sm:font-medium">
                        {title}
                    </span>

                    {/* Should create own component, or refactor the menu to accept on success behavior */}
                    <div className="flex w-fit items-center justify-center gap-2">
                        {chatType === 'RESEARCH_FROM_DOCUMENT' ? (
                            <div className="block lg:hidden">
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

                        <ChatOptionsMenu title={title} chatId={chatId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

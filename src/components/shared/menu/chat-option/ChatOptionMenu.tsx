import { AiOutlineEllipsis } from 'react-icons/ai'

import { DeleteChat } from './DeleteChat'
import { RenameChatTitle } from './RenameChatTitle'
import { PopoverMenu } from '../PopoverMenu'

type TRenameTitleProps = {
    title: string
    chatId: string
}

export const ChatOptionsMenu = (props: TRenameTitleProps) => {
    const { title, chatId } = props

    return (
        <PopoverMenu
            renderButton={() => <AiOutlineEllipsis className="relative h-6 w-6 cursor-pointer" />}
            renderMenu={() => (
                <div className="flex flex-col gap-5 p-5">
                    <div>
                        <RenameChatTitle originalTitle={title} chatId={chatId} />
                    </div>
                    <div>
                        <DeleteChat chatId={chatId} />
                    </div>
                </div>
            )}
        />
    )
}

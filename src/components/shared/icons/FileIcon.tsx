// This component will return file icon given file name
import { cn } from '@/utils/cn'
import {
    BiSolidFilePdf,
    BiSolidFileDoc,
    BiSolidFileTxt,
    BiSolidFileJpg,
    BiSolidFile,
} from 'react-icons/bi'

type TProp = { filename: string; className?: string }

export const FileIcon = ({ filename, className }: TProp) => {
    // pdf
    if (filename.endsWith('.pdf'))
        return <BiSolidFilePdf className={cn(className, 'text-red-600')} />

    // txt
    if (filename.endsWith('.txt'))
        return <BiSolidFileTxt className={cn(className, 'text-primary-font')} />

    // word
    if (filename.endsWith('.doc') || filename.endsWith('.docx'))
        return <BiSolidFileDoc className={cn(className, 'text-blue-600')} />

    // jpg
    if (filename.endsWith('.jpg') || filename.endsWith('jpeg'))
        return <BiSolidFileJpg className={cn(className, 'text-green-600')} />

    // default case. We will return a place filler
    return <BiSolidFile className={cn(className, 'text-primary')} />
}

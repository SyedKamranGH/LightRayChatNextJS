import { DocIcon, PdfIcon, TxtIcon } from '.'

type TProps = { filename: string; size?: number }

export const SvgFileIcon = (props: TProps) => {
    const { filename, size = 23 } = props

    if (filename.endsWith('.pdf')) {
        return <PdfIcon size={size} />
    }

    if (filename.endsWith('.txt')) {
        return <TxtIcon size={size} />
    }

    if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
        return <DocIcon size={size} />
    }

    return
}

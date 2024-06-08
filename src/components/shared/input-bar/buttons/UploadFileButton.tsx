import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import { AiOutlinePlus } from 'react-icons/ai'

const MAX_FILES_COUNT = 5
const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.txt', '.docx']

const PlusButton = ({ active = true }) => {
    return (
        <div
            className={twMerge(
                'flex h-10 w-10 items-center justify-center rounded-full p-1',
                'transition',
                active
                    ? 'cursor-pointer bg-main-background shadow-lg hover:scale-105'
                    : 'bg-gray-200',
            )}
        >
            <AiOutlinePlus
                className={twMerge('transition', active ? 'fill-primary' : 'fill-white')}
            />
        </div>
    )
}

type TProps = {
    uploadedFiles: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    show?: boolean
}

export const UploadFileButton = ({ uploadedFiles, setFiles, show = true }: TProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
            return toast.info('No file selected.')
        }

        const { files: selectedFiles } = e.target

        const files: File[] = []
        for (let i = 0; i < selectedFiles.length; i++) {
            // Uploaded maximum number of files. Prevent user from uploading more
            if (i + uploadedFiles.length === MAX_FILES_COUNT) {
                toast.info('You can only select up to 5 files!')
                break
            }

            // Prevent user from uploading files with same name
            const uploadedFileNames = uploadedFiles.map(file => file.name)
            if (uploadedFileNames.includes(selectedFiles[i].name)) {
                toast.info('You cannot upload the same file twice!')
                continue
            }

            files.push(selectedFiles[i])
        }

        setFiles(prev => [...prev, ...files])
    }

    const reachedMaximumFile = uploadedFiles.length === MAX_FILES_COUNT

    return (
        <div className={twMerge('flex justify-center', !show && 'hidden')}>
            <label
                className="text-4xl"
                htmlFor="file-upload"
                title="Add files, max 5 files, accepts PDF, DOCX, and TXT."
            >
                <PlusButton active={!reachedMaximumFile} />
            </label>
            <input
                type="file"
                id="file-upload"
                multiple
                accept={ALLOWED_FILE_EXTENSIONS.join(',')}
                onChange={onChange}
                disabled={reachedMaximumFile}
                className="hidden"
            />
        </div>
    )
}

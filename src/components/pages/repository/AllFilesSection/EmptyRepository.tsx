import { Button } from '@/components/shared'
import { EmptyRepositoryIcon } from '@/components/shared/icons/EmptyRepositoryIcon'

export const EmptyRepository = (props: { onUpload: () => void }) => {
    return (
        <div className="mx-auto flex max-w-[36rem] flex-1 flex-col items-center justify-center gap-y-6 pb-4 pt-6">
            <div>
                <EmptyRepositoryIcon className="h-[10rem] w-[10rem] sm:h-[20dvh] sm:w-[20dvh]" />
            </div>

            <div className="flex flex-col gap-y-4 text-center">
                <h2 className="font-medium text-black sm:text-lg">
                    Your repository is currently empty.
                </h2>
                <p className="text-sm">
                    This is a perfect place to organise and store your important documents, files,
                    and resources. Start by uploading your files or documents to build your personal
                    library. Get organised, stay efficient, and have all your content in one place
                    for easy access.
                </p>
            </div>

            <div>
                <Button variant="primary" className="rounded-md" onClick={props.onUpload}>
                    Upload File
                </Button>
            </div>
        </div>
    )
}

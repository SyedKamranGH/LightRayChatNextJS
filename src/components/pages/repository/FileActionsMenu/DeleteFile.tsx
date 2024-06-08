import { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { DeleteFilesActionModal } from '../DeleteFilesModal'
import { FileActionButton } from './FileActionButton'

type TProps = { fileId: string; filename: string }

export const DeleteFile = (props: TProps) => {
    const { fileId, filename } = props

    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    return (
        <div>
            <FileActionButton onClick={openModal}>
                <LuTrash2 className="h-5 w-5" />
                <p className="text-sm">Delete File</p>
            </FileActionButton>

            <DeleteFilesActionModal
                show={showModal}
                selectedFiles={[{ fileId }]}
                onClose={closeModal}
                filename={filename}
            />
        </div>
    )
}

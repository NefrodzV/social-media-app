import { useEffect, useRef } from 'react'
import { useDialog } from '../hooks'
export default function Modal({ children }) {
    const dialogRef = useRef()
    const { closeDialog } = useDialog()
    useEffect(() => {
        const dialog = dialogRef?.current
        dialog.showModal()
    }, [])
    return (
        <dialog ref={dialogRef}>
            <button onClick={closeDialog}>close</button>
            {children}
        </dialog>
    )
}

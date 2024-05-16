import { useEffect, useRef } from 'react'

export default function Modal({ children }) {
    const dialogRef = useRef()
    useEffect(() => {
        const dialog = dialogRef?.current
        dialog.showModal()
    }, [])
    return <dialog ref={dialogRef}>{children}</dialog>
}

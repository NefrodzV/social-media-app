import { useEffect, useRef } from 'react'
import { useDialog, useImages } from '../hooks'
import style from '../stylesheets/Modal.module.css'
export default function Modal({ children, height = '' }) {
    const dialogRef = useRef()
    const { closeDialog } = useDialog()
    const { xmarkSvg } = useImages()
    console.log(height)
    useEffect(() => {
        const dialog = dialogRef?.current
        dialog.showModal()
    }, [])
    return (
        <dialog
            className={style.modal}
            ref={dialogRef}
            autoFocus={false}
            style={{ height }}
        >
            <button className={style.close} onClick={closeDialog}>
                <span className="hidden-text">close</span>
                <img className={style.icon} src={xmarkSvg} alt="close icon" />
            </button>
            {children}
        </dialog>
    )
}

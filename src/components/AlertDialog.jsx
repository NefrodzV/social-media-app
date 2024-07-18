import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from '../stylesheets/AlertDialog.module.css'
export default function AlertDialog({ title, text, onSubmit, onCancel }) {
    const dialogRef = useRef()

    useEffect(() => {
        const dialogEl = dialogRef?.current
        dialogEl.showModal()
    }, [])

    return (
        <dialog className={style.alertDialog} ref={dialogRef}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.content}>{text}</p>
            <div className={style.container}>
                <button className={style.cancel} onClick={onCancel}>
                    Cancel
                </button>
                <button className={style.ok} onClick={onSubmit}>
                    Ok
                </button>
            </div>
        </dialog>
    )
}
AlertDialog.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isActive: PropTypes.bool,
}

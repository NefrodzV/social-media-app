import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
export default function AlertDialog({
    title,
    text,
    onSubmit,
    onCancel,
    isActive,
}) {
    const dialogRef = useRef()
    useEffect(() => {
        const dialogEl = dialogRef?.current

        console.log(dialogEl)
        console.log(isActive)
        if (isActive) {
            dialogEl.showModal()
        } else {
            dialogEl.close()
        }
    }, [isActive])

    return (
        <dialog ref={dialogRef}>
            <h1>{title}</h1>
            <p>{text}</p>
            <button onClick={onSubmit}>Ok</button>
            <button onClick={onCancel}>Cancel</button>
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

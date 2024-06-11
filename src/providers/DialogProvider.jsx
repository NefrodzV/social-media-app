import { DialogContext } from '../contexts'
import { useState } from 'react'
import { DIALOG_TYPE } from '../constants'
export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null)
    const { MODAL, ALERT_DIALOG } = DIALOG_TYPE
    function showModal(component) {
        if (!component || component === undefined) {
            throw new Error('showModal doesnt have a component is ' + component)
        }
        const dialog = {
            type: MODAL,
            component,
        }

        setDialog(dialog)
    }

    function showAlertDialog(title, text, onSubmitHandler, onCancelHandler) {
        const dialog = {
            type: ALERT_DIALOG,
            title,
            text,
            onSubmitHandler,
            onCancelHandler,
        }
        setDialog(dialog)
    }

    function closeDialog() {
        setDialog(null)
    }
    return (
        <DialogContext.Provider
            value={{
                dialog,
                DIALOG_TYPE,
                showAlertDialog,
                showModal,
                closeDialog,
            }}
        >
            {children}
        </DialogContext.Provider>
    )
}

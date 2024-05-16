import { useContext } from 'react'
import { DialogContext } from '../App'
import { DIALOG_TYPE } from '../constants'

export default function useDialog() {
    const {
        setDialog,
        dialog,
        DIALOG_TYPE: { MODAL, ALERT_DIALOG },
        closeDialog,
    } = useContext(DialogContext)

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
    return {
        setDialog,
        dialog,
        showModal,
        showAlertDialog,
        DIALOG_TYPE,
        closeDialog,
    }
}

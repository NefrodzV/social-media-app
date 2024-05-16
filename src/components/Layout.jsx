import { Header, ToastContainer, AlertDialog, Modal } from '../components'
import { useDialog, useToast } from '../hooks'
export default function Layout({ children }) {
    // This is the main layout for the pages
    const { toasts } = useToast()
    const { dialog, DIALOG_TYPE } = useDialog()

    function dialogRenderHandler(dialog) {
        let component = null
        const type = dialog.type
        const { ALERT_DIALOG, MODAL } = DIALOG_TYPE
        switch (type) {
            case ALERT_DIALOG:
                component = (
                    <AlertDialog
                        title={dialog.title}
                        text={dialog.text}
                        onSubmit={dialog.onSubmitHandler}
                        onCancel={dialog.onCancelHandler}
                    />
                )
                break

            case MODAL:
                component = <Modal>{dialog.component}</Modal>
                break
            default:
                throw new Error('DIALOG TYPE NOT HANDLED' + type)
        }

        return component
    }
    return (
        <div className="layout">
            <Header />
            <main>
                {children}
                <div>Followers</div>
            </main>
            {dialog && dialogRenderHandler(dialog)}
            {toasts.length !== 0 && <ToastContainer />}
        </div>
    )
}

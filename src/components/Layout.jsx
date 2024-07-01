import {
    Header,
    ToastContainer,
    AlertDialog,
    Modal,
    FollowerList,
} from '../components'
import { useDialog, useNotification, useAuthUser } from '../hooks'
export default function Layout({ children }) {
    // This is the main layout for the pages
    const { toasts } = useNotification()
    const { dialog, DIALOG_TYPE } = useDialog()
    const { user } = useAuthUser()
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
                <FollowerList
                    title={'My followers'}
                    followers={user?.followers}
                />
                {dialog && dialogRenderHandler(dialog)}
                {toasts.length !== 0 && <ToastContainer />}
            </main>
        </div>
    )
}

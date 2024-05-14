import { Header, CreatePost, ToastContainer } from '../components'
import { useDialog, useToast } from '../hooks'
export default function Layout({ children }) {
    // This is the main layout for the pages
    const { toasts } = useToast()
    const { dialog, DIALOG_TYPE } = useDialog()

    function dialogRenderHandler(type) {
        console.log(type)
        let component = null
        const { CREATE_POST, COMMENT } = DIALOG_TYPE
        switch (type) {
            case CREATE_POST:
                component = <CreatePost />
                break
            default:
                throw new Error('DIALOG TYPE NOT HANDLED')
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

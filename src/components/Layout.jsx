import { Header, CreatePost, ToastContainer } from '../components'
import { useToast } from '../hooks'
export default function Layout({ children }) {
    // This is the main layout for the pages
    const { toasts } = useToast()
    return (
        <div className="layout">
            <Header />
            <main>
                {children}
                <div>Followers</div>
                <CreatePost />
            </main>
            {toasts.length !== 0 && <ToastContainer />}
        </div>
    )
}

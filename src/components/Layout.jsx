import { Header, CreatePost, ToastContainer } from '../components'
export default function Layout({ children }) {
    // This is the main layout for the pages
    return (
        <div className="layout">
            <Header />
            <main>
                {children}
                <div>Followers</div>
                <CreatePost />
            </main>
            <ToastContainer />
        </div>
    )
}

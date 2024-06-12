import { Link } from 'react-router-dom'
import { useAuth, useDialog, useNotification } from '../hooks'
import Inbox from './Inbox'
export default function Navigation({ style, children }) {
    // TODO IMPLEMENT LOGOUT HERE
    const { user, logout } = useAuth()
    const { showModal } = useDialog()
    function openInbox() {
        showModal(<Inbox />)
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link to={`/${user?.fullname}/posts`}>My posts</Link>
                </li>
                <li>
                    <Link to={`/profile`}>My profile</Link>
                </li>
                <li>
                    <button onClick={openInbox}>inbox</button>
                </li>
                {children}
            </ul>
        </nav>
    )
}

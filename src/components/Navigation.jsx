import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function Navigation({ style, children }) {
    // TODO IMPLEMENT LOGOUT HERE
    const { user, logout } = useAuth()
    return (
        <nav>
            <ul>
                <li>
                    <Link to={`/${user?.fullname}/posts`}>My posts</Link>
                </li>
                <li>
                    <Link to={`/profile`}>My profile</Link>
                </li>
                {children}
            </ul>
        </nav>
    )
}

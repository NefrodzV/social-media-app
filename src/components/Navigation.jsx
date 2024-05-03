import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { useLocalStorage } from '../hooks'

export default function Navigation({ style }) {
    const { user, setIsAuthenticated } = useContext(UserContext)
    const { set } = useLocalStorage()
    async function logoutHandler() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/session/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                const json = await response.json()
                throw new Error(json)
            }

            set('isAuthenticated', false)
            setIsAuthenticated(false)
        } catch (e) {
            throw new Error('Error logging out: ' + e)
        }
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link to={`/${user?.fullname}/posts`}>My posts</Link>
                </li>
                <li>
                    <Link to={`/${user?.fullname}/profile`}>My profile</Link>
                </li>
                <li>
                    <button onClick={logoutHandler}>Log out</button>
                </li>
            </ul>
        </nav>
    )
}

import { createContext, useEffect, useState } from 'react'
import { Login, Home, Signup, Profile } from './pages/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { STATUS } from './constants'
import { useLocalStorage } from './hooks'
function App() {
    const { get } = useLocalStorage()
    const [isAuthenticated, setIsAuthenticated] = useState(
        get('isAuthenticated')
    )
    const [status, setStatus] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUser() {
            try {
                setStatus(STATUS.PENDING)
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/me`,
                    {
                        mode: 'cors',
                        credentials: 'include',
                    }
                )
                const json = await response.json()
                if (!response.ok) {
                    setStatus(STATUS.ERROR)
                    return console.log(json)
                }
                setStatus(STATUS.SUCCESS)
                setUser(json.user)
            } catch (e) {
                setStatus(STATUS.ERROR)
                throw new Error('GET auth user error ' + e)
            }
        }

        if (isAuthenticated) getUser()
        if (!isAuthenticated) setUser(null)
    }, [isAuthenticated])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
            index: true,
        },
        {
            path: '/signup',
            element: <Signup />,
        },

        { path: '/profile', element: <Profile /> },
    ])

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, setIsAuthenticated }}
        >
            <RouterProvider router={router} />
        </UserContext.Provider>
    )
}
export const UserContext = createContext(null)
export default App

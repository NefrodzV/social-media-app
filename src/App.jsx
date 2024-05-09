import { createContext, useEffect, useState } from 'react'
import { STATUS, DIALOG_SHOW_STATE } from './constants'
import { useLocalStorage } from './hooks'
import Router from './Router'

function App() {
    const { get } = useLocalStorage()
    const [isAuthenticated, setIsAuthenticated] = useState(
        get('isAuthenticated')
    )
    const [status, setStatus] = useState(null)
    const [user, setUser] = useState(null)
    const [show, setShow] = useState(null)
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
                    return
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

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, setIsAuthenticated }}
        >
            <DialogContext.Provider
                value={{
                    show,
                    setShow,
                    DIALOG_SHOW_STATE,
                    close: () => setShow(null),
                }}
            >
                <Router />
            </DialogContext.Provider>
        </UserContext.Provider>
    )
}
export const UserContext = createContext(null)
export const DialogContext = createContext(null)
export default App

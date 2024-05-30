import { createContext, useEffect, useState } from 'react'
import { STATUS, DIALOG_TYPE } from './constants'
import { useLocalStorage } from './hooks'
import Router from './Router'
import { AuthProvider } from './providers'

function App() {
    const [toasts, setToasts] = useState([])
    const [dialog, setDialog] = useState(null)
    const { get, set } = useLocalStorage()
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
                    return
                }
                setStatus(STATUS.SUCCESS)
                setUser(json.user)
            } catch (e) {
                setStatus(STATUS.ERROR)
                set('isAuthenticated', false)
                throw new Error('GET auth user error ' + e)
            }
        }

        if (isAuthenticated) getUser()
        if (!isAuthenticated) setUser(null)
    }, [isAuthenticated])

    return (
        <AuthProvider>
            <ToastContext.Provider value={{ toasts, setToasts }}>
                <DialogContext.Provider
                    value={{
                        dialog,
                        setDialog,
                        DIALOG_TYPE,
                        closeDialog: () => {
                            setDialog(null)
                        },
                    }}
                >
                    <Router />
                </DialogContext.Provider>
            </ToastContext.Provider>
        </AuthProvider>
    )
}
export const ToastContext = createContext(null)
export const UserContext = createContext(null)
export const DialogContext = createContext(null)
export default App

import { createContext, useEffect, useState } from 'react'
import { STATUS, DIALOG_TYPE } from './constants'
import Router from './Router'
import { AuthProvider, NotificationProvider } from './providers'

function App() {
    const [dialog, setDialog] = useState(null)

//     useEffect(() => {
//         async function getUser() {
//             try {
//                 setStatus(STATUS.PENDING)
//                 const response = await fetch(
//                     `${import.meta.env.VITE_API_URL}/users/me`,
//                     {
//                         mode: 'cors',
//                         credentials: 'include',
//                     }
//                 )
//                 const json = await response.json()
//                 if (!response.ok) {
//                     setStatus(STATUS.ERROR)
//                     return
//                 }
//                 setStatus(STATUS.SUCCESS)
//                 setUser(json.user)
//             } catch (e) {
//                 setStatus(STATUS.ERROR)
//                 set('isAuthenticated', false)
//                 throw new Error('GET auth user error ' + e)
//             }
//         }
// 
//         if (isAuthenticated) getUser()
//         if (!isAuthenticated) setUser(null)
//     }, [isAuthenticated])

    return (
        <AuthProvider>
            <NotificationProvider>
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
            </NotificationProvider>
        </AuthProvider>
    )
}
export const ToastContext = createContext(null)
export const UserContext = createContext(null)
export const DialogContext = createContext(null)
export default App

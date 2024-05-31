import Router from './Router'
import { AuthProvider, NotificationProvider, DialogProvider } from './providers'
function App() {
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
                <DialogProvider>
                    <Router />
                </DialogProvider>
            </NotificationProvider>
        </AuthProvider>
    )
}
export default App

import Router from './Router'
import { AuthProvider, NotificationProvider, DialogProvider } from './providers'
function App() {
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

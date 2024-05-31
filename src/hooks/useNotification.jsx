import { useContext } from 'react'
import { NotificationContext } from '../contexts'
export default function useNotification() {
    const notificationContext = useContext(NotificationContext)
    if (!notificationContext)
        throw new Error(
            'useNotification error not initialized in a NotificationProvider'
        )
    return notificationContext
}

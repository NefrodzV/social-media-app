import { useState, useCallback } from 'react'
import { NotificationContext } from '../contexts'
export function NotificationProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback(
        function showToast(message, type) {
            const id = Date.now()
            setToasts([...toasts, { id, message, type }])
        },
        [toasts, setToasts]
    )

    const removeToast = useCallback(
        function removeToast(id) {
            setToasts(toasts.filter((toast) => toast.id !== id))
        },
        [toasts, setToasts]
    )
    return (
        <NotificationContext.Provider
            value={{ toasts, setToasts, showToast, removeToast }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

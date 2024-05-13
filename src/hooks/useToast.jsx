import { ToastContext } from '../App'
import { useContext, useCallback } from 'react'
export default function useToast() {
    const { toasts, setToasts } = useContext(ToastContext)

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
    return { toasts, showToast, removeToast }
}

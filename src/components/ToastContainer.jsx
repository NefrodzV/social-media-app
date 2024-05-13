import { useEffect } from 'react'
import { useToast } from '../hooks'
import Toast from './Toast'
export default function ToastContainer() {
    const { toasts, removeToast } = useToast()

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeToast(toasts[0].id)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }
    }, [toasts])
    return (
        <div className="toast-container bottom">
            {toasts?.map((toast) => {
                return (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                    />
                )
            })}
        </div>
    )
}

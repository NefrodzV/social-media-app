import useToast from '../hooks/useToast'
import Toast from './Toast'
import { useEffect, useState } from 'react'
export default function ToastContainer() {
    const { toasts } = useToast()
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

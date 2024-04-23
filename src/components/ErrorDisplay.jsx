import { useEffect, useRef } from 'react'

export default function Error({ message }) {
    const errorRef = useRef()
    useEffect(() => {
        if (message) {
            errorRef.current.classList.add('show')
        } else {
            errorRef.current.classList.remove('show')
        }
    }, [message])
    return (
        <div ref={errorRef} className="error">
            {message}
        </div>
    )
}

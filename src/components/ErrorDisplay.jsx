import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
export default function ErrorDisplay({ message }) {
    const errorRef = useRef()
    useEffect(() => {
        if (message) {
            errorRef.current.classList.add('show')
        } else {
            errorRef.current.classList.remove('show')
        }
    }, [message])
    return (
        <div ref={errorRef} className="error-text">
            {message}
        </div>
    )
}

ErrorDisplay.propTypes = {
    message: PropTypes.string,
}

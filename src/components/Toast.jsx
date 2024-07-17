import { useNotification } from '../hooks'
import infoIcon from '../assets/svgs/info-solid.svg'
import errorIcon from '../assets/svgs/exclamation-solid.svg'
import successIcon from '../assets/svgs/check-solid.svg'
export default function Toast({ id, message, type = 'info' }) {
    const icons = {
        info: infoIcon,
        error: errorIcon,
        success: successIcon,
    }
    const { removeToast } = useNotification()

    return (
        <div className={`toast bottom`} role="alert">
            <img src={icons[type]} alt="alert icon" />
            <div>{message}</div>
            <div>
                <button onClick={removeToast.bind('id', id)}>X</button>
            </div>
        </div>
    )
}

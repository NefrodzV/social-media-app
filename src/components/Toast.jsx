import { useNotification } from '../hooks'
import infoIcon from '../assets/svgs/info-solid.svg'
import errorIcon from '../assets/svgs/exclamation-solid.svg'
import successIcon from '../assets/svgs/check-solid.svg'
import style from '../stylesheets/Toast.module.css'
import closeIcon from '../assets/svgs/xmark-solid.svg'
export default function Toast({ id, message, type = 'info' }) {
    const icons = {
        info: infoIcon,
        error: errorIcon,
        success: successIcon,
    }
    const { removeToast } = useNotification()

    return (
        <div className={`${style.toast}`} role="alert">
            <img className={style.icon} src={icons[type]} alt="alert icon" />
            <p className={style.message}>{message}</p>

            <button onClick={removeToast.bind('id', id)}>
                <img src={closeIcon} />
                <span className="hidden-text">Close message</span>
            </button>
        </div>
    )
}

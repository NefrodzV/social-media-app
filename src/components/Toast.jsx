import { useNotification } from '../hooks'
export default function Toast({ id, message, type }) {
    const { removeToast } = useNotification()

    return (
        <div className={`toast bottom`} role="alert">
            <div>
                <button onClick={removeToast.bind('id', id)}>X</button>
            </div>

            <div>{message}</div>
        </div>
    )
}

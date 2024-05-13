import useToast from '../hooks/useToast'
export default function Toast({ id, message, type }) {
    const { removeToast } = useToast()

    return (
        <div className={`toast bottom`} role="alert">
            <div>
                <button onClick={removeToast.bind('id', id)}>X</button>
            </div>

            <div>{message}</div>
        </div>
    )
}

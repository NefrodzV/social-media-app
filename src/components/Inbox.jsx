import { useAuthUser } from '../hooks'
export default function Inbox() {
    const { user } = useAuthUser()
    return (
        <div>
            <h1>Inbox</h1>
            <h2>Pending requests</h2>
            <ul>
                {user?.requests.pending.length === 0 && (
                    <div>No pending requests</div>
                )}
                {user?.requests?.pending.map((request) => (
                    <li
                        key={request._id}
                    >{`sender: ${request.sender} , reciever: ${request.reciever}`}</li>
                ))}
            </ul>
            <h2>Sent requests</h2>
            <ul>
                {user?.requests?.sent.map((request) => (
                    <li
                        key={request._id}
                    >{`sender: ${request.sender} , reciever: ${request.reciever}`}</li>
                ))}
            </ul>
        </div>
    )
}

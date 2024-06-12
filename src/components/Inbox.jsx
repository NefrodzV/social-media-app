import { useAuthUser } from '../hooks'
export default function Inbox() {
    const { user, removeSentRequest } = useAuthUser()
    async function deleteFollowerRequest(id) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/followers/' + id, {
                mode: 'cors',
                credentials: 'include',
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(await response.json())
            }
            removeSentRequest(id)
        } catch (e) {
            throw new Error('DELETE follower request: ' + e)
        }
    }
    return (
        <div>
            <h1>Inbox</h1>
            <h2>Pending requests</h2>
            <ul>
                {user?.requests.pending.length === 0 && (
                    <div>No pending requests</div>
                )}
                {user?.requests?.pending.map((request) => (
                    <li key={request._id}>
                        {`sender: ${request.sender} , reciever: ${request.reciever}`}
                        <button>accept</button>
                        <button>reject</button>
                    </li>
                ))}
            </ul>
            <h2>Sent requests</h2>
            <ul>
                {user?.requests.sent.length === 0 && (
                    <div>No sent requests</div>
                )}
                {user?.requests?.sent.map((request) => (
                    <li key={request._id}>
                        {`sender: ${request.sender} , reciever: ${request.reciever}`}
                        <button
                            onClick={deleteFollowerRequest.bind(
                                'id',
                                request._id
                            )}
                        >
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

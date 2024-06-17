import { useAuthUser, useNotification } from '../hooks'
export default function Inbox() {
    const { user, removeSentRequest, updateFollowers } = useAuthUser()
    const { showToast } = useNotification()
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

    async function updateRequest(request, isAccepted) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(
                url + 'users/me/followers/' + request._id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({ accepted: isAccepted }),
                }
            )
            if (!response.ok) {
                throw new Error(response.status)
            }
            updateFollowers(request)
        } catch (e) {
            showToast('Some error occurred with request update')
            throw new Error('PUT accept or reject follower request error: ' + e)
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
                        {`user: ${request.user.fullname}`}
                        <button onClick={() => updateRequest(request, true)}>
                            accept
                        </button>
                        <button onClick={() => updateRequest(request, false)}>
                            reject
                        </button>
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
                        {`user: ${request.user.fullname}`}
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

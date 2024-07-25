import { useAuthUser, useNotification } from '../hooks'
import style from '../stylesheets/Inbox.module.css'
import userSvg from '../assets/svgs/user-solid.svg'
export default function Inbox() {
    const { user, removeSentRequest, updateFollowers } = useAuthUser()
    const { showToast } = useNotification()

    console.log(user.requests)
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
        <div className={style.container}>
            <h1>Inbox</h1>
            {user?.requests.pending.length === 0 &&
                user?.requests.sent.length === 0 && (
                    <div className="contaner-center-items">
                        There is nothing in inbox
                    </div>
                )}
            {user?.requests.pending.length != 0 && (
                <>
                    <h2 className={style.title}>Pending requests</h2>
                    <ul className={style.list}>
                        {user?.requests.pending.length === 0 && (
                            <div className="container-center-items">
                                No pending requests
                            </div>
                        )}
                        {user?.requests?.pending.map((request) => (
                            <li key={request._id} className={style.item}>
                                <img
                                    src={request?.user?.imgUrl || userSvg}
                                    alt="user profile picture"
                                />
                                <div className={style.name}>
                                    {request.user.fullname}
                                </div>
                                <div className={style.buttons}>
                                    <button
                                        onClick={() =>
                                            updateRequest(request, true)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="green"
                                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                            />
                                        </svg>
                                        <span className="hidden-text">
                                            accept
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateRequest(request, false)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 384 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {user?.requests.sent.length != 0 && (
                <>
                    <h2 className={style.title}>Sent requests</h2>
                    <ul className={style.list}>
                        {user?.requests.sent.length === 0 && (
                            <div>No sent requests</div>
                        )}
                        {user?.requests?.sent.map((request) => (
                            <li key={request._id} className={style.item}>
                                <img
                                    src={request?.user?.imgUrl || userSvg}
                                    alt="user profile picture"
                                />
                                <div className={style.name}>
                                    {request.user.fullname}
                                </div>

                                <div className={style.buttons}>
                                    <button
                                        className={style.delete}
                                        onClick={deleteFollowerRequest.bind(
                                            'id',
                                            request._id
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 384 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                            />
                                        </svg>
                                        <span className="hidden-text">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

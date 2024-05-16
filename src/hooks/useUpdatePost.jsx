import { useCallback, useState } from 'react'
import { STATUS } from '../constants'
export default function useUpdatePost({ postId }) {
    const [status, setStatus] = useState(null)
    const { ERROR, SUCCESS, PENDING } = STATUS
    const updatePostHandler = useCallback(
        async function (data) {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/posts/' + postId, {
                    method: 'PUT',
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify(data),
                })
                if (!response.ok) {
                    return setStatus(ERROR)
                }
                setStatus(SUCCESS)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('PUT post error: ' + e)
            }
        },
        [ERROR, PENDING, SUCCESS, postId]
    )

    return { updateStatus: status, update: updatePostHandler }
}

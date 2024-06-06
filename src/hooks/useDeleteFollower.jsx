import { STATUS } from '../constants'
import { useState } from 'react'
export default function useDeleteFollower() {
    const [status, setStatus] = useState(null)
    const { SUCCESS, ERROR, PENDING } = STATUS
    async function deleteFollowerHandler(id) {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/followers', {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ followerId: id }),
            })
            if (!response.ok) {
                setStatus(ERROR)
                throw new Error('POST  follower error')
            }

            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('DELETE  follower error ' + e)
        }
    }

    return { status, deleteFollowerHandler }
}

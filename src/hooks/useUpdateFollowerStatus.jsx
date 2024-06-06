import { STATUS } from '../constants'
import { useState } from 'react'
export default function useUpdateFollowerStatus() {
    const [status, setStatus] = useState(null)
    const { SUCCESS, ERROR, PENDING } = STATUS
    async function updateFollowerStatus(id) {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/followers', {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ followerId: id }),
            })
            if (!response.ok) {
                setStatus(ERROR)
                throw new Error('PUT update follower status error')
            }

            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('PUT update follower status error ' + e)
        }
    }

    return { status, updateFollowerStatus }
}

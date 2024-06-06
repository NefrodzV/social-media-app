import { STATUS } from '../constants'
import { useState } from 'react'
export default function useAddFollower() {
    const [status, setStatus] = useState(null)
    const { SUCCESS, ERROR, PENDING } = STATUS
    async function addFollowerHandler(id) {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/followers', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ userId: id }),
            })
            if (!response.ok) {
                setStatus(ERROR)
                throw new Error('POST add follower error')
            }

            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('POST add follower error ' + e)
        }
    }

    return { status, addFollowerHandler }
}

import { useState } from 'react'
import { STATUS } from '../constants'
export default function useDeletePost({ postId }) {
    const { PENDING, ERROR, SUCCESS } = STATUS
    const [status, setStatus] = useState(null)

    async function deletePost() {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/posts/' + postId, {
                credentials: 'include',
                mode: 'cors',
            })
            if (!response.ok) return setStatus(ERROR)
            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('DELETE post error:' + e)
        }
    }

    return { deleteStatus: status, deletePost }
}

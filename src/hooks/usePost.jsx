import { useState, useEffect } from 'react'
import { STATUS } from '../constants'
export default function usePost({ postId }) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const { ERROR, PENDING, SUCCESS } = STATUS
    useEffect(() => {
        async function getPost() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(`${url}/posts/${postId}`, {
                    credentials: 'include',
                    mode: 'cors',
                })
                const json = await response.json()
                if (!response.ok) {
                    return setStatus(ERROR)
                }
                setStatus(SUCCESS)
                setPost(json.post)
            } catch (e) {
                throw new Error('GET post with id error: ' + e)
            }
        }
        if (postId) getPost()
    }, [postId])

    useEffect(() => {
        if (status === PENDING) return setLoading(true)
        setLoading(false)
    }, [status, setLoading])

    return { post, loading }
}

import { useState, useEffect } from 'react'
import { STATUS } from '../constants'
// Dont know if I will use this later on
export default function useAuthUserPosts() {
    const [posts, setPosts] = useState(null)
    const [status, setStatus] = useState(null)
    const { ERROR, PENDING, SUCCESS } = STATUS
    useEffect(() => {
        async function getPosts() {
            try {
                setStatus(PENDING)
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/me/posts`,
                    {
                        mode: 'cors',
                        credentials: 'include',
                    }
                )

                const json = await response.json()
                if (!response.ok) {
                    throw new Error('Get auth user posts failed:' + json)
                }
                setPosts(json.posts)
                setStatus(SUCCESS)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('GET auth user posts failed: ' + e)
            }
        }
        getPosts()
    }, [ERROR, PENDING, SUCCESS])

    return { posts, status }
}

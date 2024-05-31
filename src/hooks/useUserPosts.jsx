import { useEffect, useState } from 'react'
import { STATUS } from '../constants'

export default function useUserPosts(id) {
    const { SUCCESS, PENDING, ERROR } = STATUS
    const [status, setStatus] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPostsWithUserId() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/users/' + id + '/posts', {
                    mode: 'cors',
                    credentials: 'include',
                })

                const json = await response.json()
                if (!response.ok) {
                    setStatus(ERROR)
                    throw new Error(
                        'GET User posts with user id error: ' + json
                    )
                }

                setStatus(SUCCESS)
                setPosts(json.posts)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('GET User posts with user id error: ' + e)
            }
        }
        if (id) getPostsWithUserId()
    }, [ERROR, PENDING, SUCCESS, id])
    return { posts, status }
}

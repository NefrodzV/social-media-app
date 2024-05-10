import { useState, useEffect } from 'react'
export default function usePosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts`,
                    {
                        mode: 'cors',
                        credentials: 'include',
                    }
                )

                const json = await response.json()
                if (!response.ok) {
                    console.log('GET public error response' + json)
                    return
                }
                setPosts(json.posts)
            } catch (e) {
                throw new Error('GET public posts error: ' + e)
            }
        }

        getPosts()
    }, [])
    return { posts }
}

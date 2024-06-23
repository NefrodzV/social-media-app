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
    async function likePost(postId, likeExists) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/posts/' + postId + '/likes', {
                method: likeExists ? 'DELETE' : 'POST',
                mode: 'cors',
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error(
                    'Update post has some errors ' + (await response.json()) ||
                        response.status
                )
            }
            // Now update the posts
            const updatedPosts = posts.map((post) => {
                if (post._id) {
                    post.iLiked = !likeExists
                }
                return post
            })

            setPosts(updatedPosts)
        } catch (e) {
            console.error(e)
        }
    }
    return { posts, likePost }
}

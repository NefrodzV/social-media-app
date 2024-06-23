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

    async function deleteLike(post) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(
                url + '/posts/' + post?._id + '/likes',
                {
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error(
                    'DELETE like errors: ' + (await response.json()) ||
                        response.status
                )
            }
            const updatedPosts = posts.map((post) => {
                if (post._id) {
                    delete post.myLike
                }
                return post
            })

            setPosts(updatedPosts)
        } catch (e) {
            console.error(e)
        }
    }

    async function createLike(post) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(
                url + '/posts/' + post?._id + '/likes',
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error(
                    'POST like errors: ' + (await response.json()) ||
                        response.status
                )
            }
            const updatedPosts = posts.map((post) => {
                if (post._id) {
                    post.myLike = true
                }
                return post
            })
            setPosts(updatedPosts)
        } catch (e) {
            console.error(e)
        }
    }
    function likePost(post) {
        console.log(post)
        if (!post?.myLike) {
            console.log('create like')
            createLike(post)
        } else {
            console.log('deleting like')
            deleteLike(post)
        }
    }
    return { posts, likePost }
}

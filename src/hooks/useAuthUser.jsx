import { useContext } from 'react'
import { AuthContext } from '../contexts'

export default function useAuthUser() {
    const authContext = useContext(AuthContext)
    if (!authContext) throw new Error('User context giving null')

    const { user, setUser } = authContext

    function updateUserImage(url) {
        const updatedUser = { ...user, imgUrl: url }
        setUser(updatedUser)
    }

    function removeSentRequest(id) {
        const sentRequests = user?.requests?.sent
        const filteredSentRequests = sentRequests.filter(
            (request) => request._id !== id
        )
        const updatedRequests = { ...user.requests, sent: filteredSentRequests }
        setUser({ ...user, requests: updatedRequests })
    }

    function updateFollowers(follower) {
        const updatedFollowers = [...user.followers, { follower }]
        setUser({ ...user, followers: updatedFollowers })
    }

    function updatePost(postId, text) {
        const updatedPosts = user?.posts?.map((post) => {
            if (post?._id === postId) {
                post.text = text
            }
            return post
        })

        setUser({ ...user, posts: updatedPosts })
    }
    return {
        user,
        updateUserImage,
        removeSentRequest,
        updateFollowers,
        updatePost,
    }
}

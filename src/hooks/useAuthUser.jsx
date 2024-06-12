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
    return { user, updateUserImage, removeSentRequest }
}

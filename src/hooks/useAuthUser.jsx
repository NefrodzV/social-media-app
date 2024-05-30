import { UserContext } from '../App'
import { useContext } from 'react'

export default function useAuthUser() {
    const userContext = useContext(UserContext)
    if (!userContext) throw new Error('User context giving null')

    const { user, setUser } = userContext
    function updateUserImage(url) {
        const updatedUser = { ...user, imgUrl: url }
        setUser(updatedUser)
    }
    return { user, updateUserImage }
}

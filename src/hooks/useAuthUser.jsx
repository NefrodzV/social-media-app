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
    return { user, updateUserImage }
}

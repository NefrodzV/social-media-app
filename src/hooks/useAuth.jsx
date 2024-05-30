import { useContext } from 'react'
import { AuthContext } from '../contexts'
export default function useAuth() {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('useAuth not initialized in AuthContext Provider')
    }
    return authContext
}

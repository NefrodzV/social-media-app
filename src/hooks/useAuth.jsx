import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
export default function useAuth() {
    const { isAuthenticated } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) navigate('/login', { replace: true })
    }, [isAuthenticated, navigate])
}

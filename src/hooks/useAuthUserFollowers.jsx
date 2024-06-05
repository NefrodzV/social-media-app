import { useEffect, useState } from 'react'
import { STATUS } from '../constants'
export default function useAuthUserFollowers() {
    const [followers, setFollowers] = useState([])
    const [status, setStatus] = useState(null)

    const { PENDING, ERROR, SUCCESS } = STATUS
    useEffect(() => {
        async function getFollowers() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/users/me/followers', {
                    credentials: 'include',
                    mode: 'cors',
                })

                const json = await response.json()
                if (!response.ok) {
                    setStatus(ERROR)
                    throw new Error(json)
                }
                setStatus(SUCCESS)
                setFollowers(json.followers)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('GET auth user followers error: ' + e)
            }
        }
        getFollowers()
    }, [ERROR, PENDING, SUCCESS])

    return { followers, status }
}

import { useEffect, useState } from 'react'
import { STATUS } from '../constants'

export default function useUser(id) {
    const { SUCCESS, ERROR, PENDING } = STATUS
    const [status, setStatus] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUser() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/users/' + id, {
                    mode: 'cors',
                    credentials: 'include',
                })

                const json = await response.json()
                if (!response.ok) {
                    setStatus(ERROR)
                    throw new Error('GET User with id error: ' + json)
                }
                setStatus(SUCCESS)
                setUser(json.user)
            } catch (e) {
                setStatus(ERROR)
                console.error('GET User with id error: ' + e)
            }
        }
        if (id) getUser()
    }, [ERROR, PENDING, SUCCESS, id])

    return { user, status }
}

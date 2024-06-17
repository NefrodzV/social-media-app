import { STATUS } from '../constants'
import { useEffect, useState } from 'react'
export default function useUsers() {
    const [users, setUsers] = useState([])
    const { ERROR, SUCCESS, PENDING } = STATUS
    const [status, setStatus] = useState(null)

    useEffect(() => {
        async function getUsers() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/users', {
                    mode: 'cors',
                    credentials: 'include',
                })

                const json = await response.json()
                if (!response.ok) {
                    throw new Error(json)
                }

                setStatus(SUCCESS)
                setUsers(json.users)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('GET users error: ' + e)
            }
        }
        getUsers()
    }, [])

    async function sendRequest(id) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/followers', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ userId: id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                const err = await response.json()
                throw new Error(err)
            }

            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('POST send request error ' + e)
        }
    }
    return {
        users,
        status,
        sendRequest,
    }
}

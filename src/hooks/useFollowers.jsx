import { useEffect, useState } from 'react'
import { STATUS } from '../constants'
import { useAuthUser, useNotification } from '../hooks'
export default function useFollowers() {
    const [followers, setFollowers] = useState([])
    const [status, setStatus] = useState(null)
    const { SUCCESS, ERROR, PENDING } = STATUS
    const { showToast } = useNotification()
    useEffect(() => {
        async function getRecommendedFollowers() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url + '/users', {
                    credentials: 'include',
                    mode: 'cors',
                })

                const json = await response.json()

                if (!response.ok) {
                    setStatus(ERROR)
                    throw new Error(
                        'GET followers recommendation error: ' + json
                    )
                }

                setStatus(SUCCESS)
                setFollowers(json.users)
            } catch (e) {
                setStatus(ERROR)
                throw new Error('GET followers recommendation error: ' + e)
            }
        }
        getRecommendedFollowers()
    }, [ERROR, PENDING, SUCCESS])

    async function addFollower(id) {
        try {
            setStatus(PENDING)
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
                console.log(err)
                setStatus(ERROR)
                throw new Error(err)
            }

            setStatus(SUCCESS)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('POST add follower error ' + e)
        }
    }

    return { followers, status, addFollower }
}

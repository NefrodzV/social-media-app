import { useEffect, useState } from 'react'
import { STATUS } from '../constants'
import { AuthContext } from '../contexts'
import { useLocalStorage } from '../hooks'
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    const { SUCCESS, PENDING, ERROR } = STATUS
    const { set, get } = useLocalStorage()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        // If there is already a user no need to look for this
        if (user) return
        const auth = get('auth')
        if (auth === undefined || auth === null) {
            return
        }
        setIsLoggedIn(true)
        setUser(auth.user)
    }, [get, set, user])

    useEffect(() => {
        // if (user && !isLoggedIn) getUser()
        if (!user) setIsLoggedIn(false)
    }, [isLoggedIn, user])

    useEffect(() => {
        getUser()
    }, [])
    async function getUser() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/me`,
                {
                    credentials: 'include',
                    mode: 'cors',
                }
            )
            const json = await response.json()
            if (!response.ok) {
                throw new Error('GET user details error ' + json)
            }
            setUser(json.user)
            setIsLoggedIn(true)
        } catch (e) {
            set('auth', null)
            setIsLoggedIn(false)
            console.error(e)
        }
    }

    const login = async (data) => {
        try {
            setStatus(PENDING)
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/session/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    mode: 'cors',
                    credentials: 'include',
                }
            )
            const json = await response.json()
            if (!response.ok) {
                setStatus(ERROR)
                setErrors(json.errors)
                return
            }
            setStatus(SUCCESS)
            setUser(json.user)
            set('auth', { user: json.user })
            getUser()
        } catch (e) {
            setStatus(ERROR)
            throw new Error('Login action error: ' + e)
        }
    }

    async function logout() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/session/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                const json = await response.json()
                throw new Error(json)
            }

            setUser(null)
        } catch (e) {
            throw new Error('Error logging out: ' + e)
        }
    }
    return (
        <AuthContext.Provider
            value={{ user, status, errors, setUser, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

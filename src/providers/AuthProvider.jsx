import { createContext, useContext, useState } from 'react'
import { STATUS } from '../constants'
import { AuthContext } from '../contexts'
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    const { SUCCESS, PENDING, ERROR } = STATUS

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
                }
            )
            const json = await response.json()
            if (!response.ok) {
                setStatus(ERROR)
                setErrors(json.errors)
                return
            }
            // If the login response was successfull
            setStatus(SUCCESS)
            setUser(json.user)
            console.log(json)
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

import { useContext, useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group, Loader, ErrorDisplay } from '../components/index'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../App'
import { useLocalStorage } from '../hooks'

export default function Login() {
    const { user } = useContext(UserContext)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    const { set } = useLocalStorage()
    async function login(data) {
        try {
            setStatus(STATUS.PENDING)
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
                setStatus(STATUS.ERROR)
                console.log(json)
                setErrors(json.errors)
                return
            }
            // TODO: Implement something to
            // Cookies.set('authToken', json.token, { expires: 3 })
            set('isLoggedIn', true)
            setStatus(STATUS.SUCCESS)
            setErrors(null)
        } catch (e) {
            setStatus(STATUS.ERROR)
            throw new Error('Login action error: ' + e)
        }
    }
    function loginHandler(e) {
        e.preventDefault()
        login(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <main>
            {user ? <Navigate to={'/'} replace={true} /> : null}
            <form onSubmit={loginHandler} noValidate>
                <h1>Login</h1>
                <Group>
                    <Input
                        name={'email'}
                        type={'email'}
                        placeholder={'Email'}
                    />
                    <ErrorDisplay message={errors?.email} />
                </Group>
                <Group>
                    <Input
                        name={'password'}
                        type={'password'}
                        placeholder={'password'}
                    />
                    <ErrorDisplay message={errors?.password} />
                </Group>
                {status === STATUS.PENDING ? (
                    <Loader width={16} height={16} borderWidth={4} />
                ) : null}
                <button disabled={status === 'pending'}>Login</button>
                <Link to={'/signup'}>Create an account</Link>
            </form>
        </main>
    )
}

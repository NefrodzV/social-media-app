import { useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group, Loader, ErrorDisplay } from '../components/index'
import { Link } from 'react-router-dom'

export default function Login() {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    async function login(data) {
        try {
            setStatus(STATUS.PENDING)
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/session/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
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
            console.log(json)
            setStatus(STATUS.SUCCESS)
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

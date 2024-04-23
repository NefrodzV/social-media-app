import { useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group, Error, Loader } from '../components/index'

export default function Login() {
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState(null)
    async function login(data) {
        try {
            setStatus(STATUS.PENDING)
            const response = await fetch(
                'http://localhost:3000/session/login',
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
        <div>
            <form onSubmit={loginHandler} noValidate>
                <h1>Login</h1>
                <Group>
                    <Input
                        name={'email'}
                        type={'email'}
                        placeholder={'Email'}
                    />
                    <Error message={errors?.email} />
                </Group>
                <Group>
                    <Input
                        name={'password'}
                        type={'password'}
                        placeholder={'password'}
                    />
                    <Error message={errors?.password} />
                </Group>
                {status === STATUS.PENDING ? (
                    <Loader width={16} height={16} borderWidth={4} />
                ) : null}
                <button disabled={status === 'pending'}>Login</button>
            </form>
        </div>
    )
}

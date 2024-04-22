import { useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group } from '../components/index'

export default function Login() {
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
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
                return console.log(json)
            }
            setStatus(STATUS.SUCCESS)
        } catch (e) {
            setStatus(STATUS.ERROR)
            throw new Error('Login action error: ' + e)
        }
    }
    function loginHandler(e) {
        e.preventDefault()
        login(new FormData(e.target))
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
                </Group>
                <Group>
                    <Input
                        name={'password'}
                        type={'password'}
                        placeholder={'password'}
                    />
                </Group>
                <button disabled={status === 'pending'}>Login</button>
            </form>
        </div>
    )
}

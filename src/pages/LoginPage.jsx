import { useEffect } from 'react'
import { STATUS } from '../constants'
import { Input, Group, Loader, ErrorDisplay } from '../components/index'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function Login() {
    const { user, status, errors, login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])

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

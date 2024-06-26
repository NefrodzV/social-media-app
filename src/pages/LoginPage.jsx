import { useEffect, useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group, ErrorDisplay, LoaderOverlay } from '../components/index'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useImages } from '../hooks'

export default function Login() {
    const { user, status, errors, login, resetErrors } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])
    useEffect(() => {
        return () => {
            resetErrors()
        }
    }, [])
    function loginHandler(e) {
        e.preventDefault()
        login(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <main className="fullscreen login-page">
            <form className="login-form" onSubmit={loginHandler} noValidate>
                <h1>Login</h1>
                <h2 className="text-opaque">Welcome back!</h2>
                <Group>
                    <Input
                        className={'primary'}
                        name={'email'}
                        type={'email'}
                        placeholder={'Email'}
                        hasError={errors?.email ? true : false}
                    />
                    <ErrorDisplay message={errors?.email} />
                </Group>
                <Group>
                    <Input
                        name={'password'}
                        type={'password'}
                        placeholder={'Password'}
                        hasError={errors?.password ? true : false}
                    />
                    <ErrorDisplay message={errors?.password} />
                </Group>
                {status === STATUS.PENDING ? <LoaderOverlay /> : null}
                <button type={'submit'} disabled={status === 'pending'}>
                    Login
                </button>
                <hr />
                <Link to={'/signup'}>Create an account</Link>
            </form>
        </main>
    )
}

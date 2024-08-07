import { useEffect, useState } from 'react'
import { STATUS } from '../constants'
import { Input, Group, ErrorDisplay, LoaderOverlay } from '../components/index'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useImages } from '../hooks'
import style from '../stylesheets/Login.module.css'

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
        <main className={style.login}>
            <form onSubmit={loginHandler} noValidate>
                <h1>Login</h1>
                <h2 className="text-opaque">Welcome back!</h2>
                <Group>
                    <Input
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
                {status === STATUS.PENDING ? (
                    <LoaderOverlay message={'Signing in please wait...'} />
                ) : null}
                <Group>
                    <button
                        className="primary"
                        type={'submit'}
                        disabled={status === 'pending'}
                    >
                        sign in
                    </button>
                    <hr />
                    <Link className={'secondary'} to={'/signup'}>
                        Go to sign up
                    </Link>
                </Group>
            </form>
        </main>
    )
}

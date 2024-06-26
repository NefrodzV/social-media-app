import { ErrorDisplay, Group, Input, Loader } from '../components'
import { useState } from 'react'
import { STATUS } from '../constants/index'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)

    async function signup(data) {
        try {
            setStatus(STATUS.PENDING)
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/session/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(data),
                }
            )
            const json = await response.json()
            if (!response.ok) {
                console.log(json.errors)
                setStatus(STATUS.ERROR)
                setErrors(json.errors)
                return
            }
            setStatus(STATUS.SUCCESS)
            console.log(json)
        } catch (e) {
            setStatus(STATUS.ERROR)
            throw new Error('Signup error: ' + e)
        }
    }
    function signupHandler(e) {
        e.preventDefault()
        signup(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <main className="signin-page">
            <form className="signin-form" noValidate onSubmit={signupHandler}>
                <h1>Create an account</h1>
                <Group>
                    <Input
                        name={'firstName'}
                        label={'First name:'}
                        type={'text'}
                        hasError={errors?.firstName ? true : false}
                    />
                    <ErrorDisplay message={errors?.firstName} />
                    <Input
                        name={'lastName'}
                        label={'Last name:'}
                        type={'text'}
                        hasError={errors?.lastName ? true : false}
                    />

                    <ErrorDisplay message={errors?.lastName} />
                </Group>
                <Group>
                    <Input
                        name={'email'}
                        label={'Email:'}
                        type={'text'}
                        hasError={errors?.email ? true : false}
                    />
                    <ErrorDisplay message={errors?.email} />
                </Group>
                <Group>
                    <Input
                        name={'password'}
                        label={'Password:'}
                        type={'password'}
                        hasError={errors?.password ? true : false}
                    />
                    <ErrorDisplay message={errors?.password} />
                    <Input
                        name={'confirmPassword'}
                        label={'Confirm password:'}
                        type={'password'}
                        hasError={errors?.confirmPassword ? true : false}
                    />
                    <ErrorDisplay message={errors?.confirmPassword} />
                </Group>
                {status === 'pending' ? (
                    <Loader width={16} height={16} borderWidth={4} />
                ) : null}
                <button className="margin-tp-1r" type="submit">
                    Submit
                </button>
                <hr />
                <Link to={'/login'}>Go login</Link>
            </form>
        </main>
    )
}

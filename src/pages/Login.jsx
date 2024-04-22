import { Input, Group } from '../components/index'

export default function Login() {
    function loginHandler(e) {
        e.preventDefault()
    }
    return (
        <div>
            <form onSubmit={loginHandler} noValidate={true}>
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
                <button>Login</button>
            </form>
        </div>
    )
}

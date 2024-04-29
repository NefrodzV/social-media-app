import { useContext, useState } from 'react'
import { UserContext } from '../App'
import { STATUS } from '../constants'
export default function NewPost() {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    async function post(data) {
        console.log(JSON.stringify(data))
        console.log(data)
        try {
            setStatus(STATUS.PENDING)
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/me/posts`,
                {
                    method: 'POST',
                    headers: {
                        // authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(data),
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                const json = await response.json()
                setStatus(STATUS.ERROR)
                setErrors(json.errors)
                console.log(json)
                return
            }
            setStatus(STATUS.SUCCESS)
        } catch (e) {
            throw new Error('POST new post failed: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        post(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <>
            <h1>Make a new post</h1>
            <form noValidate onSubmit={onSubmitHandler}>
                <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    placeholder="What are you thinking about?"
                ></textarea>
                <input
                    type="checkbox"
                    name="privatePost"
                    onClick={(e) => {
                        const checkbox = e.target
                        if (checkbox.checked === true) {
                            checkbox.value = true
                        } else {
                            checkbox.value = false
                        }
                    }}
                />
                <label htmlFor="private">Set post as private</label>
                <button>Submit</button>
            </form>
        </>
    )
}

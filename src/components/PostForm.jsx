import { useEffect, useRef, useState } from 'react'
import { STATUS } from '../constants'
import PropTypes from 'prop-types'
import { useDialog, useToast } from '../hooks'

export default function PostForm() {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    const { closeDialog } = useDialog()
    const { showToast } = useToast()

    async function post(data) {
        try {
            setStatus(STATUS.PENDING)
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/me/posts`,
                {
                    method: 'POST',
                    headers: {
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
                return
            }
            setStatus(STATUS.SUCCESS)
            showToast('New post created!')
            closeDialog()
        } catch (e) {
            throw new Error('POST new post failed: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        post(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <form noValidate onSubmit={onSubmitHandler}>
            <h1>Make a new post</h1>
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
            <button>submit</button>
            <button type="button" onClick={closeDialog}>
                cancel
            </button>
        </form>
    )
}

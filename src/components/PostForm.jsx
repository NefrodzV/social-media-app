import { useEffect, useRef, useState } from 'react'
import { STATUS } from '../constants'
import PropTypes from 'prop-types'
import { useDialog, useNotification } from '../hooks'
import Group from '../components/Group'
import styles from '../stylesheets/PostForm.module.css'
import lockSvg from '../assets/svgs/lock-solid.svg'

export default function PostForm() {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)
    const { closeDialog } = useDialog()
    const { showToast } = useNotification()
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
        <form
            className={styles.container}
            noValidate
            onSubmit={onSubmitHandler}
        >
            <h1 className="hidden-text">Make a new post</h1>
            <textarea
                className={styles.textarea}
                name="text"
                id="text"
                cols="30"
                rows="10"
                placeholder="What are you going to write about?..."
                maxLength={400}
            ></textarea>
            <label className={styles.private} htmlFor="private">
                <input
                    id="private"
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
                <span className={styles.info}>Set as private</span>
                <img src={lockSvg} />
            </label>

            <button className={`${styles.post}`}>Post</button>
        </form>
    )
}

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
    const [postIsPrivate, setPostIsPrivate] = useState(false)
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
            {/* <label className={styles.private} htmlFor="private">
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
            </label> */}

            <Group style={styles.footer}>
                <Group style={styles.controls}>
                    <label className={styles.control} htmlFor="private">
                        <input
                            id="private"
                            type="checkbox"
                            name="privatePost"
                            checked={postIsPrivate}
                            onChange={(e) => {
                                console.log('onClick')
                                const checkbox = e.target
                                if (checkbox.checked === true) {
                                    // checkbox.value = true
                                    setPostIsPrivate(true)
                                } else {
                                    // checkbox.value = false
                                    setPostIsPrivate(false)
                                }
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                            />
                        </svg>

                        <div className={styles.info}>
                            Private status:
                            {postIsPrivate ? 'enabled' : 'disabled'}. Private
                            posts will only be seen by your followers
                        </div>
                    </label>

                    <label htmlFor="#" className={styles.control}>
                        <input
                            id="images"
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                            />
                        </svg>

                        <div className={styles.info}>Upload image</div>
                    </label>
                </Group>
                <button className={`${styles.post}`}>Post</button>
            </Group>
        </form>
    )
}

import { useEffect, useState } from 'react'
import { useDialog, useToast, useUpdatePost } from '../hooks'
import { STATUS } from '../constants'
export default function EditPostForm({ post }) {
    const { closeDialog } = useDialog()
    const [text, setText] = useState('')
    const { status, update } = useUpdatePost(post?._id)
    const { showToast } = useToast()

    useEffect(() => {
        setText(post?.text)
    }, [post])

    useEffect(() => {
        if (status === STATUS.ERROR) {
            showToast('Something went wrong updating post. Try again later.')
            closeDialog()
        } else if (status === STATUS.SUCCESS) {
            showToast('Post updated!')
            closeDialog()
        }
    }, [status, showToast, closeDialog])
    function onSubmitHandler(e) {
        e.preventDefault()
        update(Object.fromEntries(new FormData(e.target)))
    }

    function onChangeTextarea(e) {
        setText(e.target.value)
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <h1>Edit post</h1>
            <textarea
                name="text"
                value={text}
                onChange={onChangeTextarea}
            ></textarea>
            <button>submit</button>
            <button onClick={closeDialog} type="button">
                cancel
            </button>
        </form>
    )
}

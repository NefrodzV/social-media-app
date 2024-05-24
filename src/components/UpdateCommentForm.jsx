import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function UpdateCommentForm({
    comment,
    onSubmitHandler,
    onCancelHandler,
}) {
    console.log(comment)
    const [text, setText] = useState('')

    useEffect(() => {
        setText(comment?.text)
    }, [comment])

    function onSubmit(e) {
        e.preventDefault()
        onSubmitHandler(comment._id, Object.fromEntries(new FormData(e.target)))
    }
    function onChangeText(e) {
        setText(e.target.value)
    }
    return (
        <form onSubmit={onSubmit}>
            Update comment
            <input
                type="text"
                name="text"
                value={text}
                onChange={onChangeText}
            />
            <button>update</button>
            <button onClick={onCancelHandler} type="button">
                cancel
            </button>
        </form>
    )
}

UpdateCommentForm.propTypes = {
    comment: PropTypes.object,
    onSubmitHandler: PropTypes.func,
    onCancelHandler: PropTypes.func,
}

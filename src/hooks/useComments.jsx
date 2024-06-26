import { useState, useEffect } from 'react'
import { STATUS } from '../constants'
export default function useComments({ postId }) {
    const [comments, setComments] = useState([])
    const [status, setStatus] = useState(null)
    const { ERROR, SUCCESS, PENDING } = STATUS
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getComments() {
            try {
                setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(
                    `${url}/posts/${postId}/comments`,
                    {
                        credentials: 'include',
                        mode: 'cors',
                    }
                )
                const json = await response.json()
                if (!response.ok) {
                    return setStatus(ERROR)
                }
                setStatus(SUCCESS)
                setComments(json.comments)
            } catch (e) {
                throw new Error('GET comments error:' + e)
            }
        }
        if (postId) getComments()
    }, [postId])

    useEffect(() => {
        if (status === PENDING) return setLoading(true)
        setLoading(false)
    }, [status])

    function removeComment(id) {
        const filter = comments.filter((comment) => comment._id !== id)
        setComments(filter)
    }
    function updateCommentText(id, text) {
        const map = comments.map((comment) => {
            if (comment._id === id) {
                comment.text = text
            }
            return comment
        })
        setComments(map)
    }

    return { comments, loading, removeComment, updateCommentText }
}

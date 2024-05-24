import { useState } from 'react'
import { STATUS } from '../constants'
import useToast from './useToast'
import useDialog from './useDialog'

export default function useDeleteComment(postId, removeHandler) {
    const { SUCCESS, ERROR, PENDING } = STATUS
    const [status, setStatus] = useState(null)
    const { showToast } = useToast()
    const { closeDialog } = useDialog()
    async function deleteComment(id) {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(
                url + '/posts/' + postId + '/comments/' + id,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                setStatus(ERROR)
                return
            }
            setStatus(SUCCESS)
            showToast('Comment delete successfull')
            removeHandler(id)
        } catch (e) {
            setStatus(ERROR)
            throw new Error('DELETE comment error: ' + e)
        } finally {
            closeDialog()
        }
    }

    return {
        deleteComment,
    }
}

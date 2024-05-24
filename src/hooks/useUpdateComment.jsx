import { useState } from 'react'
import { STATUS } from '../constants'
import useToast from './useToast'
import useDialog from './useDialog'
export default function useUpdateComment(postId, updateHandler) {
    const [status, setStatus] = useState(null)
    const { SUCCESS, ERROR, PENDING } = STATUS
    const { showToast } = useToast()
    const { closeDialog } = useDialog()
    async function updateComment(id, data) {
        try {
            setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(
                url + '/posts/' + postId + '/comments/' + id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            )
            if (!response.ok) {
                return setStatus(ERROR)
            }
            updateHandler(id, data.text)
            showToast('Comment updated!')
        } catch (e) {
            setStatus(ERROR)
            throw new Error('UPDATE comment error: ' + e)
        } finally {
            closeDialog()
        }
    }

    return { updateComment }
}

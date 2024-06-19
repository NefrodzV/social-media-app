import { useState } from 'react'
import { STATUS } from '../constants'
import useNotification from './useNotification'
import useAuthUser from './useAuthUser'
import useDialog from './useDialog'
export default function useDeletePost({ postId }) {
    // const { PENDING, ERROR, SUCCESS } = STATUS
    // const [status, setStatus] = useState(null)
    const { showToast } = useNotification()
    const { removePost } = useAuthUser()
    const { closeDialog } = useDialog()
    async function deletePost() {
        try {
            // setStatus(PENDING)
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/posts/' + postId, {
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors',
            })
            if (!response.ok) {
                throw new Error('DELETE post error: ' + response.status)
            }
            console.log('post deleted')
            closeDialog()
            showToast('Post delete successfully')
            removePost(postId)

            // setStatus(SUCCESS)
        } catch (e) {
            // setStatus(ERROR)
            showToast('Post couldnt be deleted. Please try again.')
            console.error('DELETE post error:' + e)
        }
    }

    return { deletePost }
}

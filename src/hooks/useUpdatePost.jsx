import { useCallback, useState } from 'react'
import { STATUS } from '../constants'
import useDialog from './useDialog'
import useNotification from './useNotification'
import useAuthUser from './useAuthUser'
export default function useUpdatePost({ postId }) {
    // const [status, setStatus] = useState(null)
    const { ERROR, SUCCESS, PENDING } = STATUS
    const { closeDialog } = useDialog()
    const { showToast } = useNotification()
    const { updatePost } = useAuthUser()
    const updatePostHandler = useCallback(
        async function (data) {
            try {
                // setStatus(PENDING)
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(
                    url + '/users/me/posts/' + postId,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'PUT',
                        credentials: 'include',
                        mode: 'cors',
                        body: JSON.stringify(data),
                    }
                )
                if (!response.ok) {
                    const json = await response.json()

                    throw new Error(json.errors || response.status)
                }
                updatePost(postId, data.text)
                showToast('Post updated!')

                // setStatus(SUCCESS)
            } catch (e) {
                // setStatus(ERROR)
                showToast(
                    'Something went wrong updating post. Try again later.'
                )
                console.log(e)
                console.error(JSON.stringify(e))
            } finally {
                closeDialog()
            }
        },
        [postId, showToast, closeDialog]
    )

    return { updatePostHandler }
}

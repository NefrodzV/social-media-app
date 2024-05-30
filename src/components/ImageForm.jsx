import { useAuthUser, useDialog } from '../hooks'

export default function ImageForm({ onSuccessHandler }) {
    const { updateUserImage } = useAuthUser()
    const { closeDialog } = useDialog()
    async function uploadImage(data) {
        try {
            const url = import.meta.env.VITE_API_URL
            const response = await fetch(url + '/users/me/image', {
                credentials: 'include',
                mode: 'cors',
                method: 'POST',
                body: data,
            })

            const json = await response.json()
            if (!response.ok) {
                throw new Error('POST image error: ' + json)
            }
            updateUserImage(json.imageUrl)
            onSuccessHandler(json.imageUrl)
            closeDialog()
        } catch (e) {
            throw new Error('POST image error: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        uploadImage(new FormData(e.target))
    }
    return (
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <input type="file" name="image" />
            <button>submit</button>
        </form>
    )
}

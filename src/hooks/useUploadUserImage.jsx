import useAuthUser from './useAuthUser'

export default function useUploadUserImage() {
    const { updateUserImage } = useAuthUser()
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
                throw new Error('POST image error' + json)
            }

            console.log('imageResponse' + json)
            console.log(json)
            const imageUrl = json.imageUrl
            updateUserImage(imageUrl)
        } catch (e) {
            throw new Error('POST image error: ' + e)
        }
    }

    return { uploadImage }
}

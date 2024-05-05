export default function CommentList({ postId, children }) {
    async function sendComment(data) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                console.log('Error sending comment in post' + postId)
                return
            }
            console.log('Success sending comment to post:' + postId)
            console.log(await response.json())
        } catch (e) {
            throw new Error('POST comment error: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        sendComment(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <>
            <div>Comments</div>
            <ul>{children}</ul>
            <form onSubmit={onSubmitHandler}>
                <input type="hidden" name="postId" value={postId} />
                <input
                    type="text"
                    name="text"
                    placeholder={
                        children?.length
                            ? 'Write a comment'
                            : 'Be the first one to comment'
                    }
                />
                <button>submit</button>
            </form>
        </>
    )
}

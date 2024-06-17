import { useImages } from '../hooks'
export default function UserItem({ user, sendRequestHandler }) {
    const { userSolidSvg } = useImages()
    return (
        <article>
            <img
                src={user.imgUrl || userSolidSvg}
                alt="user profile image"
                style={{ width: 50 }}
            />
            {user?.fullname}
            <button onClick={sendRequestHandler.bind('id', user?._id)}>
                send request
            </button>
        </article>
    )
}

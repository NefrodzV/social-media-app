import { useImages } from '../hooks'
import style from '../stylesheets/UserItem.module.css'
import userSvg from '../assets/svgs/user-solid.svg'
import requestSvg from '../assets/svgs/paper-plane-solid.svg'
export default function UserItem({ user, sendRequestHandler }) {
    return (
        <article className={style.card}>
            <img
                className={style.img}
                src={user.imgUrl || userSvg}
                alt="user profile image"
            />
            <div className={style.name}>{user?.fullname}</div>
            <button
                className={style.request}
                onClick={sendRequestHandler.bind('id', user?._id)}
            >
                <img src={requestSvg} alt="button icon" />
                <span>Send follower request</span>
            </button>
        </article>
    )
}

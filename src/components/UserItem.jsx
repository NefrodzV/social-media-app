export default function UserItem({ user, sendRequestHandler }) {
    return (
        <article>
            {user?.fullname}
            <button onClick={sendRequestHandler}>send request</button>
        </article>
    )
}

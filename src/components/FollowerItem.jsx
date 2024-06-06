export default function FollowerItem({
    user,
    addFollower,
    deleteFollower,
    isAddEnabled,
    isDeleteEnabled,
    editing,
}) {
    return (
        <article>
            {user?.fullname}
            {editing && isDeleteEnabled && (
                <button onClick={deleteFollower}>Remove</button>
            )}
            {isAddEnabled && <button onClick={addFollower}>Add</button>}
        </article>
    )
}

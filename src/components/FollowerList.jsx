import { useState } from 'react'
import FollowerItem from './FollowerItem'
import {
    useAddFollower,
    useDeleteFollower,
    useUpdateFollowerStatus,
} from '../hooks'
import PropTypes from 'prop-types'
export default function FollowerList({
    followers,
    enableAdd,
    enableEdit,
    enableDelete,
}) {
    const [editing, setEditing] = useState(false)
    const { addFollowerHandler } = useAddFollower()
    const { deleteFollowerHandler } = useDeleteFollower()
    return (
        <section>
            <h1>Follower Recomendations</h1>
            {followers?.map((follower) => (
                <FollowerItem
                    key={follower._id}
                    user={follower}
                    isAddEnabled={enableAdd}
                    enableDelete={enableDelete}
                    addFollower={addFollowerHandler}
                    deleteFollower={deleteFollowerHandler}
                />
            ))}
        </section>
    )
}
FollowerList.propTypes = {
    followers: PropTypes.array,
}

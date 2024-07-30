import { useRef, useState } from 'react'
import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
import style from '../stylesheets/FollowerList.module.css'
import DropdownMenu from '../components/DropdownMenu'
export default function FollowerList({
    title,
    followers,
    deleteFollowerHandler,
}) {
    const [isEditing, setIsEditing] = useState(false)
    const sectionRef = useRef(null)
    return (
        <section
            className={style.list}
            ref={sectionRef}
            onMouseLeave={() => setIsEditing(false)}
        >
            <h1 className={style.title}>{title}</h1>

            {deleteFollowerHandler && (
                <DropdownMenu
                    top={'.4rem'}
                    right={'.4rem'}
                    items={[
                        {
                            text: 'edit',
                            clickHandler: () => setIsEditing(true),
                        },
                    ]}
                />
            )}

            <div className={style.container}>
                {(followers?.length === 0 || followers === undefined) && (
                    <div className="container-center-items">
                        There are no followers
                    </div>
                )}
                {followers?.map((follower) => (
                    <FollowerItem
                        key={follower._id}
                        follower={follower}
                        deleteFollower={deleteFollowerHandler}
                        isEditing={isEditing}
                    />
                ))}
            </div>
        </section>
    )
}
FollowerList.propTypes = {
    title: PropTypes.string,
    followers: PropTypes.array,
    addFollowerHandler: PropTypes.func,
    deleteFollowerHandler: PropTypes.func,
}

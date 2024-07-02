import PropTypes from 'prop-types'
import { useImages, useUtils } from '../hooks'
import DropdownMenu from './DropdownMenu'
export default function CommentItem({ comment, deleteHandler, updateHandler }) {
    const { formatFullname } = useUtils()
    const { userSvg } = useImages()
    const dropDownItems = [
        {
            text: 'update',
            clickHandler: updateHandler.bind('comment', comment),
        },
        {
            text: 'delete',
            clickHandler: deleteHandler.bind('id', comment?._id),
        },
    ]
    return (
        <article className="comment">
            <img
                className="icon small-box-shadow-inset"
                src={comment?.user.imgUrl || userSvg}
                alt="user image"
            />
            <div className="content">
                <div className="user">{formatFullname(comment?.user)}</div>
                <div className="text">{comment?.text}</div>
            </div>

            <DropdownMenu items={dropDownItems} />
        </article>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object,
}

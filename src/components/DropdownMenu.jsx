import { useImages } from '../hooks'
import PropTypes from 'prop-types'
export default function DropdownMenu({ items }) {
    const { ellipsisSvg } = useImages()
    return (
        <div className="dropdown-menu">
            <img className="icon" src={ellipsisSvg} alt="dropdown icon" />
            <div className="content">
                {items?.map((item) => (
                    <button
                        className={'dropdown-button'}
                        key={item.text}
                        onClick={item.clickHandler}
                    >
                        {item.text}
                    </button>
                ))}
                {/* <button
                                className="dropdown-button"
                                onClick={editPostHandler}
                            >
                                Edit
                            </button>

                            <button
                                className="dropdown-button"
                                onClick={deletePostHandler}
                            >
                                Delete
                            </button> */}
            </div>
        </div>
    )
}

DropdownMenu.propTypes = {
    items: PropTypes.array,
}

import { useImages } from '../hooks'
import PropTypes from 'prop-types'
import styles from '../stylesheets/Dropdown.module.css'
export default function DropdownMenu({ items }) {
    const { ellipsisSvg } = useImages()
    return (
        <div className={styles.dropdown}>
            <img
                className={styles.icon}
                src={ellipsisSvg}
                alt="dropdown icon"
            />
            <div className={styles.container}>
                {items?.map((item) => (
                    <button key={item.text} onClick={item.clickHandler}>
                        {item.text}
                    </button>
                ))}
            </div>
        </div>
    )
}

DropdownMenu.propTypes = {
    items: PropTypes.array,
}

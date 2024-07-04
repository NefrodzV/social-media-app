import PropTypes from 'prop-types'
import style from '../stylesheets/PostList.module.css'
export default function PostList({ children, classNames }) {
    return (
        <section className={style.list + ` ${classNames || ''}`}>
            <h1>Posts</h1>
            <div className={style.container}>{children}</div>
        </section>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

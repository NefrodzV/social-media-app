import PropTypes from 'prop-types'
import style from '../stylesheets/PostList.module.css'
export default function PostList({ children, classNames, emptyListError }) {
    return (
        <section className={style.list + ` ${classNames || ''}`}>
            <h1 className={style.title}>Posts</h1>
            {children?.length !== 0 ? (
                <div className={style.container}>{children}</div>
            ) : (
                <div className="container-center-items">{emptyListError}</div>
            )}
        </section>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

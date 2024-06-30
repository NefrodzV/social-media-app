import PropTypes from 'prop-types'
export default function PostList({ children, style }) {
    return (
        <section className={`post-list ${style || ''}`}>
            <h1>Posts</h1>
            {children}
        </section>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

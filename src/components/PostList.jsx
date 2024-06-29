import PropTypes from 'prop-types'
export default function PostList({ children }) {
    return (
        <section className="post-list">
            <h1>Posts</h1>
            {children}
        </section>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

import PropTypes from 'prop-types'
export default function PostList({ children }) {
    return (
        <>
            <h1 style={{ display: 'none' }}>Posts</h1>
            <section>{children}</section>
        </>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

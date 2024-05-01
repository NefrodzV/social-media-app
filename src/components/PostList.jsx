import PropTypes from 'prop-types'
export default function PostList({ children, title }) {
    return (
        <>
            <h1>{title}</h1>
            <ul>{children}</ul>
        </>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

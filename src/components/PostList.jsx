import PropTypes from 'prop-types'
export default function PostList({ children, title }) {
    return (
        <>
            <h1 style={{ display: title ? '' : 'none' }}>{title}</h1>
            <ul>{children}</ul>
        </>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

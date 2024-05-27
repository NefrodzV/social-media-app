import PropTypes from 'prop-types'
export default function PostList({ children }) {
    console.log(children)
    return (
        <section>
            <h1>Posts</h1>
            {children}
        </section>
    )
}
PostList.propTypes = {
    title: PropTypes.string,
}

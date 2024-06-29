import PropTypes from 'prop-types'

export default function Group({ children, style }) {
    return <div className={`group ${style || ''}`}>{children}</div>
}

Group.propTypes = {}

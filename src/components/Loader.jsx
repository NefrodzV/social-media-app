import Proptypes from 'prop-types'
export default function Loader({ height = 16, width = 16, borderWidth = 4 }) {
    return (
        <div
            className="loader"
            style={{
                width,
                height,
                borderWidth,
            }}
        ></div>
    )
}

Loader.propTypes = {
    height: Proptypes.number,
    width: Proptypes.number,
    borderWidth: Proptypes.number,
}

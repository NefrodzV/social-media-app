export default function Loader({ height, width, borderWidth }) {
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

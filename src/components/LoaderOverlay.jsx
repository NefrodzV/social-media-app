import Loader from './Loader'

export default function LoaderOverlay() {
    return (
        <div
            style={{
                position: 'absolute',
                inset: '0 0 0 0',
                backgroundColor: 'rgba(255,255,255,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                animation: 'fade-in 0.5s',
            }}
        >
            <Loader />
            Logging in please wait...
        </div>
    )
}

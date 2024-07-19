import Loader from './Loader'
import style from '../stylesheets/LoaderOverlay.module.css'
export default function LoaderOverlay({ message }) {
    return (
        <div
            className={style.overlay}
            // style={{
            //     position: 'absolute',
            //     inset: '0 0 0 0',
            //     backgroundColor: 'rgba(255,255,255,0.8)',
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     flexDirection: 'column',
            //     animation: 'fade-in 0.5s',
            // }}
        >
            <Loader />
            <p className={style.message}>{message}</p>
        </div>
    )
}

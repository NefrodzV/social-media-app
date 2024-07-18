import { Link } from 'react-router-dom'

export default function NavItem({ text, icon, onClickHandler, navigateTo }) {
    return (
        <li className="nav-item">
            {onClickHandler && (
                <button onClick={onClickHandler}>
                    {icon}
                    {text}
                </button>
            )}
            {navigateTo && (
                <Link to={navigateTo}>
                    {/* <img
                        className="nav-icon"
                        src={icon}
                        alt="navigation item icon"
                    /> */}
                    {icon}
                    {text}
                </Link>
            )}
        </li>
    )
}

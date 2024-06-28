import { Link } from 'react-router-dom'
import { useAuth, useDialog, useImages } from '../hooks'
import Inbox from './Inbox'
import NavItem from './NavItem'
export default function Navigation() {
    // TODO IMPLEMENT LOGOUT HERE
    const { user, logout } = useAuth()
    const { showModal } = useDialog()
    function openInbox() {
        showModal(<Inbox />)
    }
    const { homeSvg, usersSvg, inboxSvg, userSvg, logoutSvg } = useImages()
    return (
        <nav>
            <ul className="nav-list">
                <NavItem text={'home'} navigateTo={`/`} icon={homeSvg} />
                <NavItem text={'users'} navigateTo={'/users'} icon={usersSvg} />
                <NavItem
                    text={'inbox'}
                    onClickHandler={openInbox}
                    icon={inboxSvg}
                />
                <NavItem
                    text={'profile'}
                    icon={userSvg}
                    navigateTo={'/profile'}
                />
                <NavItem
                    text={'logout'}
                    icon={logoutSvg}
                    onClickHandler={logout}
                />
                {/* <li className="nav-item">
                    <Link to={`/${user?.fullname}/posts`}>My posts</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile`}>profile</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/users'}>users</Link>
                </li>
                <li className="nav-item">
                    <button onClick={openInbox}>inbox</button>
                </li>
                <li className="nav-item">
                    <button onClick={() => logout()}>logout</button>
                </li> */}
            </ul>
        </nav>
    )
}

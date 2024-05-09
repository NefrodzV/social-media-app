import { useContext } from 'react'
import Navigation from './Navigation'
import NavItem from './NavItem'
import { DialogContext } from '../App'
export default function Header() {
    const { setShow, DIALOG_SHOW_STATE } = useContext(DialogContext)
    function openCreateDialog() {
        setShow(DIALOG_SHOW_STATE.CREATE_POST)
    }
    return (
        <header>
            <span>Logo</span>
            <Navigation>
                <NavItem>
                    <button onClick={openCreateDialog}>Post</button>
                </NavItem>
            </Navigation>
        </header>
    )
}

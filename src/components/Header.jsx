import Navigation from './Navigation'
import NavItem from './NavItem'
import { useDialog } from '../hooks'
export default function Header() {
    const { setDialog, DIALOG_TYPE } = useDialog()
    function openCreateDialog() {
        setDialog(DIALOG_TYPE.CREATE_POST)
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

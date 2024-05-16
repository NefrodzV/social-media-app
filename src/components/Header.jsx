import Navigation from './Navigation'
import NavItem from './NavItem'
import { useDialog } from '../hooks'
import PostForm from './PostForm'
export default function Header() {
    const { showModal, DIALOG_TYPE } = useDialog()
    function openCreateDialog() {
        showModal(<PostForm />)
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

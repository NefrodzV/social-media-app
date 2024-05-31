import { useContext } from 'react'
import { DialogContext } from '../contexts'

export default function useDialog() {
    const dialogContext = useContext(DialogContext)
    if (!dialogContext)
        throw new Error('useDialog not initialized in a DialogProvider')
    return dialogContext
}

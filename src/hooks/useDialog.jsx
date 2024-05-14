import { useContext } from 'react'
import { DialogContext } from '../App'
export default function useDialog() {
    const context = useContext(DialogContext)

    if (!context) throw new Error('Dialog context provider not defined')
    return context
}

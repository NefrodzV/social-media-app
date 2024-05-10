import { Layout } from '../components'
import { useAuth } from '../hooks'
export default function Post() {
    useAuth()
    return <Layout></Layout>
}

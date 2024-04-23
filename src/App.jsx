import { Login, Home, Signup } from './pages/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
            index: true,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App

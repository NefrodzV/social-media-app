import Login from './pages/Login'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to={'/app/login'} replace={true} />,
        },
        {
            path: '/app/login',
            element: <Login />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App

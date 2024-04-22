import Login from './pages/Login'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to={'/app'} replace={true} />,
        },
        {
            path: '/app',
            element: <Navigate to={'/app/login'} replace={true} />,
        },

        {
            path: 'app/login',
            element: <Login />,
        },
    ])

    return <RouterProvider router={router} />
}

export default Router

import { Login, Home, Signup, Profile } from './pages/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function Router() {
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

        { path: '/profile', element: <Profile /> },
    ])

    return <RouterProvider router={router} />
}

export default Router

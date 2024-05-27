import {
    LoginPage,
    HomePage,
    SignupPage,
    PostPage,
    UserPage,
} from './pages/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
            index: true,
        },
        {
            path: '/signup',
            element: <SignupPage />,
        },

        {
            path: '/:user/posts/:postId',
            element: <PostPage />,
        },
        {
            path: '/:user',
            element: <UserPage />,
        },
        // { path: '/profile', element: <Profile /> },
    ])

    return <RouterProvider router={router} />
}

export default Router

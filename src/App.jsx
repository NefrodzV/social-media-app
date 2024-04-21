
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
 
  const router = createBrowserRouter([
    {
      path: '/app',
      children:[
        {
          path: 'login',
          index:true,
          element: <Login />
        }
      ] 
    }
  ])

  return <RouterProvider router={router} />
}

export default App

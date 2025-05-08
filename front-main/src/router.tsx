import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Home from './pages/Home'
import Stream from './pages/Stream'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'stream/:id', element: <Stream /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}

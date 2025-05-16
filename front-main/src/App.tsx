import { } from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router'
import RootLayout from './layouts/RootLayout.tsx'
import Home from './pages/Home'
import Streams from './pages/Streams.tsx'
import StreamPage from './pages/Stream'
import Login from './pages/Login'
import Register from './pages/Register.tsx'
import NewStream from './pages/NewStream.tsx'
import NotFound from './pages/NotFound.tsx'
import { AuthProvider } from './contexts/AuthContext'
import AuthRequired  from './components/AuthRequired'
import fetchStreamData from './utils/fetchStreamData'
import { streamsLoader } from './utils/streamsLoader.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='streams' element={<Streams />} loader={streamsLoader}/>
      <Route 
        path="stream/:id" 
        element={<StreamPage />} 
        loader={async ({ params }) => {
          if (!params.id) {
            throw new Response("Stream ID not found", { status: 400 });
          }
          return await fetchStreamData(params.id);
        }}
        errorElement={<NotFound />} 
      />
      <Route element={<AuthRequired />}>
        <Route path='new-stream' element={<NewStream />} />
      </Route>  
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>    
  )
}

import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
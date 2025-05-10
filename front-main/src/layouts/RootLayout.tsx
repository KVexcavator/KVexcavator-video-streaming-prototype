import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function RootLayout() {
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
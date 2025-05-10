import { NavLink } from "react-router"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 bg-gray-200 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className="block p-2 hover:bg-gray-300 rounded"
            >
              Главная
            </NavLink>
            {user ?
              <>
                <NavLink 
                  to="/new-stream"
                  className="block p-2 hover:bg-gray-300 rounded"
                >
                  New Stream
                </NavLink>
                <button 
                  onClick={logout}
                  className="block p-2 hover:bg-gray-300 rounded"
                >
                  Logout
                </button>
              </> :
              <>
                <NavLink 
                  to="/login"
                  className="block p-2 hover:bg-gray-300 rounded"
                >
                  Login
                </NavLink>
              </>
            } 
          </li>
        </ul>
      </nav>
    </aside>
  )
}
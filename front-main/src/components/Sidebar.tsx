import { Link } from 'react-router'

export default function Sidebar() {
  return (
    <aside className="w-60 bg-pink-200 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-300 rounded">
              Главная
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
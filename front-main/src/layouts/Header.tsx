import { useAuth } from "../hooks/useAuth"

export default function Header() {
  const { user, message } = useAuth()
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">StreamHub</h1>
      { user ?
        <>
          <p>Username: {user}</p>
        </> :
        <>
          <p className="text-red-500 p-2 border">
            {message}
          </p>
        </>
      }      
    </header>
  )
}
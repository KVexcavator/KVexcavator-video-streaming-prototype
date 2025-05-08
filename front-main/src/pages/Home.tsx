export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Доступные трансляции</h2>
      <ul>
        <li>
          <a href="/stream/1" className="text-blue-500 hover:underline">
            Трансляция-1
          </a>
        </li>
      </ul>
    </div>
  )
}
import { useParams } from 'react-router'

export default function Stream() {
  const { id } = useParams()

  return (
    <div>
      <h2 className="text-2xl font-bold">Трансляция #{id}</h2>
      <div className="mt-4">
        <video
          src={`http://localhost:8080/live/livestream.flv`}
          controls
          className="w-full max-w-3xl"
        />
      </div>
    </div>
  )
}

import { useLoaderData } from "react-router"
import StreamCard from "../components/StreamCard"
import { type Stream } from "../types"

const Streams = () => {
  const streams = useLoaderData() as Stream[]

  return (
    <div>
      <h1>Streams list</h1>
      <div className="md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-5">
        {streams.map((stream) => (
          <StreamCard key={stream.id} {...stream} />
        ))}
      </div>
    </div>
  )
}

export default Streams

import { type Stream } from '../types'

type StreamCardProps = Stream

const StreamCard = ({ title, description, streamer, stream_key }: StreamCardProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 text-black bg-white rounded-xl shadow-md hover:scale-105 transition-transform duration-200 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      {description && (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Description:</label>
          <textarea
            disabled
            value={description}
            className="w-full h-32 resize-none p-2 rounded-md bg-gray-50 border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}
      
      <p className="text-gray-700 text-sm">
        <span className="font-medium text-gray-600">Streamer:</span> {streamer.username}
      </p>
      
      <p className="text-gray-500 text-xs break-all">
        <span className="font-medium text-gray-600">Stream Key:</span> {stream_key}
      </p>
    </div>
  )
}

export default StreamCard

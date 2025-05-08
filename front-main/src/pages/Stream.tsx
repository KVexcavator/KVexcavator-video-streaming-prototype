import { useParams } from 'react-router'
import { HLSPlayer } from '../players/HLSPlayer'
import { FLVPlayer } from '../players/FLVPlayer'
import { useState } from 'react'

export default function StreamPage() {
  const { id } = useParams()
  const [player, setPlayer] = useState<'HLS' | 'FLV'>('HLS')

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          Трансляция #{id}
        </h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
              ${player === 'HLS' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setPlayer('HLS')}
          >
            HLS
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
              ${player === 'FLV' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setPlayer('FLV')}
          >
            FLV
          </button>
        </div>
      </div>

      <div className="mt-4">
        {player === 'HLS' ? <HLSPlayer /> : <FLVPlayer />}
      </div>
    </div>
  )
}
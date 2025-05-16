import { useLoaderData } from 'react-router'
import { HLSPlayer } from '../players/HLSPlayer'
import { FLVPlayer } from '../players/FLVPlayer'
import { useState } from 'react'
import { type Stream } from "../types"

export default function StreamPage() {
  const { stream_key } = useLoaderData() as Stream
  const [player, setPlayer] = useState<'HLS' | 'FLV'>('HLS')
  const srsUrl = import.meta.env.VITE_SRS_URL

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          Ключ трансляции: {stream_key}
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

      {/* 'http://localhost:8080/live/livestream.m3u8' */}
      {/* 'http://localhost:8080/live/livestream.flv' */}
      <div className="mt-4">
        {player === 'HLS' ? 
          <HLSPlayer url={`${srsUrl}/${stream_key}.m3u8`}/> 
          : 
          <FLVPlayer url={`${srsUrl}/${stream_key}.flv`}/>
        }
      </div>
    </div>
  )
}
import flvjs from 'flv.js';
import { useEffect, useRef } from 'react'

type FLVPlayerProps = {
  url: string
}

export const FLVPlayer = ({ url }: FLVPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (flvjs.isSupported() && videoRef.current) {
      const player = flvjs.createPlayer({
        type: 'flv',
        url: url,
      })

      player.attachMediaElement(videoRef.current)
      player.load()
      player.play()

      return () => {
        player.destroy()
      }
    }
  }, [url])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video ref={videoRef} controls className="w-full" />
    </div>
  )
}

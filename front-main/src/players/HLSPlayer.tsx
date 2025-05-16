import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

type HLSPlayerProps = {
  url: string
}
export const HLSPlayer = ({ url }: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(videoRef.current)

      return () => {
        hls.destroy()
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url
    }
  }, [url])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video ref={videoRef} controls className="w-full" />
    </div>
  )
}

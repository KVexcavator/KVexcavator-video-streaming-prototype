import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

export const HLSPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls()
      hls.loadSource('http://localhost:8080/live/livestream.m3u8')
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy()
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = 'http://localhost:8080/live/livestream.m3u8'
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video ref={videoRef} controls className="w-full" />
    </div>
  )
}

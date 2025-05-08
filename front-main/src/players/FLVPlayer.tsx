import flvjs from 'flv.js';
import { useEffect, useRef } from 'react';

export const FLVPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (flvjs.isSupported() && videoRef.current) {
      const player = flvjs.createPlayer({
        type: 'flv',
        url: 'http://localhost:8080/live/livestream.flv',
      });

      player.attachMediaElement(videoRef.current);
      player.load();
      player.play();

      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video ref={videoRef} controls className="w-full" />
    </div>
  );
};

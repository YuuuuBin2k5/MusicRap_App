import { useRef, useEffect } from "react";

import WaveformPlayer from "./WaveformPlayer";
import Waveform from "./Waveform";



const fallbackImg = "/images/s2.png";

export default function Player({ src, title, artist, artwork }) {
  const audioRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    audioRef.current?.play();
  }, [src]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-purple-950/90 to-blue-950/90 shadow-2xl border-t border-purple-800">
      <div className="max-w-3xl mx-auto grid grid-cols-[100px_1fr_270px] gap-8 items-center px-8 py-4">
        {/* Ảnh nhạc */}
        <div className="flex items-center justify-center h-full">
          <img
            ref={imgRef}
            src={artwork || fallbackImg}
            alt={title}
            className="w-30 h-30 rounded-xl object-cover border-3 border-purple-400 shadow bg-zinc-900"
            onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
          />
        </div>
        {/* Thông tin và sóng nhạc */}
        <div className="min-w-0 flex flex-col justify-center items-center">
          <div className="mb-1 w-full text-center">
            <span className="text-base font-bold text-white drop-shadow-lg truncate block">{title}</span>
            <span className="text-xs text-purple-300 truncate block">{artist}</span>
          </div>
          <div className="w-full max-w-[500px] flex justify-center">
            <WaveformPlayer src={src} />
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-col items-start justify-center gap-3 h-full min-w-0">
          <audio ref={audioRef} src={src} controls className="w-full max-w-full rounded-full bg-zinc-1000 shadow-lg border border-purple-600" preload="metadata" style={{background: 'rgba(30,30,60,0.7)'}} />
        </div>
      </div>
    </div>
  );
}

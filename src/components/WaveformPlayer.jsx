import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveformPlayer({ src }) {
  const containerRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    if (waveRef.current) waveRef.current.destroy();

    waveRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#888",
      progressColor: "#7c3aed",
      barWidth: 2,
      height: 60,
    });

    waveRef.current.load(src);
  }, [src]);

  return <div ref={containerRef} className="w-full" />;
}

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl }) {
  const waveformRef = useRef();

  useEffect(() => {
    if (!audioUrl) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#999",
      progressColor: "#7c3aed",
      height: 60,
      barWidth: 2,
      responsive: true,
    });

    wavesurfer.load(audioUrl);

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  return <div ref={waveformRef} className="w-full mb-2" />;
}

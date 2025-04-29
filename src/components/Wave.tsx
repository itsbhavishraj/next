"use client";

import { useEffect, useRef } from "react";
import { initializeWaveGenerator } from "@/lib/visualizer";

type WaveProps = {
  id: string;
  mediaStream?: MediaStream;
  waveColor: string;
};

export default function Wave({ id, mediaStream, waveColor }: WaveProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (mediaStream) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      (async () => {
        await audioContext.resume();
        initializeWaveGenerator(audioContext, id, mediaStream, waveColor);
      })();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [id, mediaStream, waveColor]);

  return (
    <canvas
      id={id}
      style={{ borderRadius: "2px" }}
      width={60}
      height={24}
    ></canvas>
  );
}

import { useState, useEffect, useRef } from 'react';

const useWebSocketTTS = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const audioBufferQueueRef = useRef([]);
  const sourceRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (isPlaying && text) {
      console.log("Establishing WebSocket connection...");
      const ws = new WebSocket("ws://localhost:8000/ws/synthesize");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected, sending text...");
        ws.send(text);
      };

      ws.onmessage = async (event) => {
        console.log("Receiving audio data...");
        const arrayBuffer = await event.data.arrayBuffer();
        audioBufferQueueRef.current.push(arrayBuffer);
        if (audioBufferQueueRef.current.length === 1) {
          playNextInQueue();
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError(error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setIsPlaying(false);
      };

      return () => {
        console.log("Cleaning up WebSocket connection...");
        ws.close();
      };
    }
  }, [text, isPlaying]);

  const playNextInQueue = () => {
    if (audioBufferQueueRef.current.length === 0) {
      console.log("No more audio in queue, stopping playback");
      setIsPlaying(false);
      return;
    }

    const buffer = audioBufferQueueRef.current.shift();
    audioContextRef.current.decodeAudioData(buffer, (decodedData) => {
      console.log("Playing audio chunk...");
      sourceRef.current = audioContextRef.current.createBufferSource();
      sourceRef.current.buffer = decodedData;
      sourceRef.current.connect(audioContextRef.current.destination);
      sourceRef.current.onended = playNextInQueue;
      sourceRef.current.start(0);
    }, (err) => {
      console.error("Error decoding audio data:", err);
    });
  };

  const play = (newText) => {
    console.log("Starting playback...");
    setText(newText);
    setIsPlaying(true);
  };

  const stop = () => {
    if (sourceRef.current) {
      console.log("Stopping playback...");
      sourceRef.current.stop();
    }
    setIsPlaying(false);
    audioBufferQueueRef.current = [];
  };

  return { play, stop, isPlaying, error };
};

export default useWebSocketTTS;

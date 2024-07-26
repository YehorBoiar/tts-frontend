import { useState, useRef } from 'react';
import { getAudioContext, addToAudioQueue, audioQueue } from './audioStore';

function usePlayAudio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopped, setStopped] = useState(false);
  const audioSourceRef = useRef(null);
  const isPlayingRef = useRef(false);
  const textChunksRef = useRef([]);

  const hexStringToArrayBuffer = (hexString) => {
    const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    return byteArray.buffer;
  };

  const fetchSynthesizedSpeech = async (text) => {
    const backendUrl = process.env.REACT_APP_TTS_URL;
    const response = await fetch(`${backendUrl}/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return hexStringToArrayBuffer(data.audio);
  };

  const decodeAudioBuffer = async (audioContext, audioBuffer) => {
    return await audioContext.decodeAudioData(audioBuffer);
  };
  
  const fetchAndAddToQueue = async (chunk) => {
    const audioContext = getAudioContext();

    try {
      const audioBuffer = await fetchSynthesizedSpeech(chunk);
      const decodedBuffer = await decodeAudioBuffer(audioContext, audioBuffer);
      addToAudioQueue(decodedBuffer);
      

    } catch (err) {
      setError(err.message);
    }
  };

  const playAudioFromQueue = async () => {
    const audioContext = getAudioContext();
    isPlayingRef.current = true;

    while (audioQueue.length > 0) {
      const buffer = audioQueue.shift();
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);

      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      audioSourceRef.current = source;

      await new Promise((resolve) => {
        source.onended = resolve;
      });

    }

    isPlayingRef.current = false;
  };


  const synthesizeAndPlayAudio = async (textChunks) => {
    setLoading(true);
    setError(null);
    setStopped(false); 
    textChunksRef.current = textChunks; 
    console.log(textChunksRef.current);
    try {
      while (textChunksRef.current.length > 0 && !stopped) {
        const chunk = textChunksRef.current.shift();
        await fetchAndAddToQueue(chunk);
        if (!isPlayingRef.current) {
          playAudioFromQueue();
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stop = () => {
    setStopped(true);
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
    textChunksRef.current = [];
    audioQueue.length = 0;
  };

  return { synthesizeAndPlayAudio, stop, loading, error };
}

export default usePlayAudio;

import { useState, useRef } from 'react';
import { getAudioContext, addToAudioQueue, audioQueue } from './audioStore';

function usePlayAudio() {
  const [error, setError] = useState(null);
  const [finishedPlaying, setFinishedPlaying] = useState(false); // Add this state
  const stoppedRef = useRef(false);
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
    setFinishedPlaying(true); // Set finishedPlaying to true when done
  };

  const synthesizeAndPlayAudio = async (textChunks) => {
    setError(null);
    setFinishedPlaying(false); // Reset finishedPlaying
    textChunksRef.current = textChunks;
    console.log(textChunksRef.current);
    try {
      while (!stoppedRef.current) {
        const chunk = textChunksRef.current.shift();
        if (chunk === undefined) {
          console.log('No more chunks');
          break;
        }
        await fetchAndAddToQueue(chunk);
        if (!isPlayingRef.current) {
          playAudioFromQueue();
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const stop = () => {
    stoppedRef.current = true;
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
  };

  const start = () => {
    stoppedRef.current = false;
    if (!audioSourceRef.current && audioQueue.length > 0) {
      audioSourceRef.current.start();
    }
  };

  return { synthesizeAndPlayAudio, stop, start, finishedPlaying, error };
}

export default usePlayAudio;

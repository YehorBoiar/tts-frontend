import { useState, useRef } from 'react';

function usePlayAudio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioSourceRef = useRef(null);
  const audioContextRef = useRef(null);

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

  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const decodeAudioBuffer = async (audioContext, audioBuffer) => {
    return await audioContext.decodeAudioData(audioBuffer);
  };

  const playAudio = (audioContext, buffer) => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);

    audioSourceRef.current = source;

    return new Promise((resolve) => {
      source.onended = resolve;
    });
  };

  const synthesizeSpeech = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const audioBuffer = await fetchSynthesizedSpeech(text);
      const audioContext = initializeAudioContext();
      const buffer = await decodeAudioBuffer(audioContext, audioBuffer);
      await playAudio(audioContext, buffer);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const stopSpeech = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
  };

  return { synthesizeSpeech, stopSpeech, loading, error };
}

export default usePlayAudio;

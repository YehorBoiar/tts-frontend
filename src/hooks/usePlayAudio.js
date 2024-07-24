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

  const synthesizeSpeech = async (text, voiceId = 'Joanna') => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice_id: voiceId })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const audioBuffer = hexStringToArrayBuffer(data.audio);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;
      const buffer = await audioContext.decodeAudioData(audioBuffer);

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

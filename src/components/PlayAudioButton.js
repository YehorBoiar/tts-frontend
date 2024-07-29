import React, { useState, useEffect } from 'react';
import useChunkText from '../hooks/useChunkText';
import usePlayAudio from '../hooks/usePlayAudio';

function PlayAudioButton({ text }) {
  const { textChunks, chunkText, loading: chunkLoading, error: chunkError } = useChunkText();
  const { synthesizeAndPlayAudio, stop, start, loading, error } = usePlayAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && textChunks.length > 0) {
      synthesizeAndPlayAudio(textChunks);
    }
  }, [textChunks, isPlaying]);

  const handlePlay = async (e) => {
    e.preventDefault();
    if (textChunks.length === 0) {
      await chunkText(text);
    }
    start();
    setIsPlaying(true);
  };
  const handleStop = (e) => {
    e.preventDefault();
    stop();
    setIsPlaying(false);
  };

  const handleClick = async (e) => {
    if (isPlaying) {
      handleStop(e);
    } else {
      await handlePlay(e);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      {(error || chunkError) && <p>Error: {error || chunkError}</p>}
    </div>
  );
}

export default PlayAudioButton;

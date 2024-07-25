import React from 'react';
import useChunkText from '../hooks/useChunkText';
import usePlayAudio from '../hooks/usePlayAudio';

function PlayAudioButton({ text }) {
  const { textChunks, chunkText, loading: chunkLoading, error: chunkError } = useChunkText();
  const { synthesizeAndPlayAudio, loading, error } = usePlayAudio();

  
  const handleSubmit  = async (e) => {
    e.preventDefault();
    await chunkText(text);
    await synthesizeAndPlayAudio(textChunks);
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>Synthesize and Play Audio</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default PlayAudioButton;

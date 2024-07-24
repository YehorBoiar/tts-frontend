import React from 'react';
import useChunkText from '../hooks/useChunkText';
import usePlayAudio from '../hooks/usePlayAudio';

function PlayAudioButton({ text }) {
  const { textChunks, chunkText, loading: chunkLoading, error: chunkError } = useChunkText();
  const { synthesizeSpeech, loading: synthLoading, error: synthError } = usePlayAudio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await chunkText(text);
    for (const chunk of textChunks) {
      await synthesizeSpeech(chunk);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} type="submit" disabled={chunkLoading || synthLoading}>
        {chunkLoading || synthLoading ? 'Processing...' : 'Play All'}
      </button>
      {(chunkError || synthError) && <p style={{ color: 'red' }}>{chunkError || synthError}</p>}
    </div>
  );
}

export default PlayAudioButton;

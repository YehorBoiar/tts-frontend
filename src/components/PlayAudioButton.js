import React, { useState, useEffect } from 'react';
import useChunkText from '../hooks/useChunkText';
import usePlayAudio from '../hooks/usePlayAudio';
import useTtsType from '../hooks/useTtsType';

function PlayAudioButton({ text, bookPath }) {
  const [selectedBookPath, setSelectedBookPath] = useState(null);
  const { textChunks, chunkText, clearTextChunks, error: chunkError } = useChunkText();
  const {ttsType, awsConfig, error: ttsError} = useTtsType(bookPath);
  const { synthesizeAndPlayAudio, stop, start, finishedPlaying, error } = usePlayAudio( {tts_model: ttsType, awsConfig: awsConfig} );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ttsError) {
      console.error('Error fetching tts model:', ttsError);
    }
  }, [ttsType]);
  useEffect(() => {
    if (isPlaying && textChunks.length > 0) {
      synthesizeAndPlayAudio(textChunks);
    }
  }, [textChunks, isPlaying]);
  
  useEffect(() => {
    if (finishedPlaying) {
      setIsPlaying(false);
    }
  }, [finishedPlaying]);
  
  const clearChunks = ( bookPath ) => {
    if (bookPath !== selectedBookPath ){
      console.log('clearTextChunks');
      clearTextChunks();
      textChunks.length = 0;
      setSelectedBookPath(bookPath);
    }
  }

  const handlePlay = async (e) => {
    clearChunks( bookPath );
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
        <button 
          onClick={handleClick} 
          className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700"
        >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      {(error || chunkError) && <p>Error: {error || chunkError}</p>}
    </div>
  );
}

export default PlayAudioButton;

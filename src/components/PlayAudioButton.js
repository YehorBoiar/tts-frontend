import React from 'react';
import useChunkText from '../hooks/useChunkText';


function PlayAudioButton({ text }) {
    const { textChunks, chunkText, loading, error } = useChunkText();


    const handleSubmit = async (e) => {
    e.preventDefault();
    await chunkText(text);
    };

    return (
    <div>
        <button onClick={handleSubmit} type="submit" disabled={loading}>
            Aboba
        </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    );
}

export default PlayAudioButton;

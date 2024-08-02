import React, { useState } from 'react';
import AwsPollyTTSForm from './AWSPollyFrom';
import useUpdateTtsModel from '../hooks/useUpdateTtsModel';


const TtsDropdownMenu = ({ bookPath }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState('');
    const { updateTtsModel, loading, error, response } = useUpdateTtsModel(
        bookPath,
        {}, 
        'standard'
    );

    const voices = ['Standard', 'AWS Polly'];

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice);
        setIsOpen(false);

        if (voice === 'Standard') {
            updateTtsModel();
        } else {
            setShowForm(true);
        }
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button className="bg-gray-800 px-10 py-1 text-white rounded inline-flex items-center" onClick={handleDropdownClick}>
                    TTS
                </button>
            </div>
            {isOpen && (
                <ul className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    {voices.map((voice, index) => (
                        <li
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleVoiceSelect(voice)}
                        >
                            {voice}
                        </li>
                    ))}
                </ul>
            )}
            {showForm && selectedVoice === 'AWS Polly' && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                    <AwsPollyTTSForm bookPath={bookPath} closeModal={closeForm} />
                </div>
            )}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default TtsDropdownMenu;

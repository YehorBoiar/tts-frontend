import React, { useState } from 'react';
import AwsPollyTTSForm from './AWSPollyFrom';


const TtsDropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const voices = [
        'AWS Polly'
    ];

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleVoiceSelect = () => {
        setShowForm(true);
        setIsOpen(false);
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
                            onClick={handleVoiceSelect}
                        >
                            {voice}
                        </li>
                    ))}
                </ul>
            )}
            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                    <AwsPollyTTSForm closeModal={closeForm} />
                </div>
            )}
        </div>
    );
};

export default TtsDropdownMenu;

import React, { useState } from 'react';
import useUpdateTtsModel from '../hooks/useUpdateTtsModel';


const AwsPollyTTSForm = ({ closeModal, bookPath }) => {
    const [secretKey, setSecretKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [region, setRegion] = useState('');
    const { updateTtsModel, loading, error, response } = useUpdateTtsModel(bookPath, { secretKey, publicKey, region }, 'polly');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTtsModel();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="mb-4 justify-between items-center flex">
                <span className="text-gray-700 font-semibold">AWS Polly</span>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">Close</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Secret Key</label>
                    <input
                        type="text"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Public Key</label>
                    <input
                        type="text"
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Region</label>
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mt-4 text-center">
                    <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800" disabled={loading}>
                        {loading ? 'Updating...' : 'Submit'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {response && <p style={{ color: 'green' }}>{response.text}</p>}
        </div>
    );
};

export default AwsPollyTTSForm;

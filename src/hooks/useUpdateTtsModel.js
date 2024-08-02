import { useState } from 'react';

const useUpdateTtsModel = (path, modelKeys) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const updateTtsModel = async () => {
        setLoading(true);
        setError(null);

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const res = await fetch(`${backendUrl}/update_tts_model`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path: path,
                    model_name: 'polly',
                    model_keys: modelKeys
                }),
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateTtsModel, loading, error, response };
};

export default useUpdateTtsModel;

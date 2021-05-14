import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Language from '../components/Language'
import data from '../data'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {

    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/languages');
                setLoading(false);
                setLanguages(data);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        
        fetchData();
    }, [])

    return (
        <div>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div class="row center">

                    {languages.map((language) => (
                        <Language key={language._id} language={language} />
                    ))}
                </div>
            )}
        </div>
    );
}

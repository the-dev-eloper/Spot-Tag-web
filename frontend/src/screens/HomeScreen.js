import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Language from '../components/Language'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listLanguages } from '../actions/languageActions';

export default function HomeScreen(props) {

    const dispatch = useDispatch();
    const languageList = useSelector((state) => state.languageList);
    const { languages, loading, error } = languageList;

    useEffect(() => {
        dispatch(listLanguages());
    }, [dispatch]);

    const gotoBugs = () => {
        props.history.push(`/buglist`);
    }

    return (
        <div>

            <div className="row">

                <h1>Langages</h1>

                <button type="button" className="primary" onClick={gotoBugs}>
                    View All Bugs
                </button>
            </div>

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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Language from '../components/Language'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listLanguages } from '../actions/languageActions';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const languageList = useSelector((state) => state.languageList);
    const { languages, loading, error } = languageList;

    useEffect(() => {
        dispatch(listLanguages());
    }, [dispatch]);

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

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { detailsLanguage, updateLanguage } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { LANGUAGE_UPDATE_RESET } from '../constants/languageConstants';

export default function LanguageEditScreen(props) {

    const languageId = props.match.params.id;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [bugList, setBugList] = useState([]);

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;
    const dispatch = useDispatch();

    const languageUpdate = useSelector((state) => state.languageUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = languageUpdate;

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/languagelist');
        }

        if (!language || language._id !== languageId || successUpdate) {
            dispatch({ type: LANGUAGE_UPDATE_RESET });
            dispatch(detailsLanguage(languageId));
        } else {
            setName(language.name);
            setImage(language.image);
            setBugList(language.bugList);
        }
    }, [language, languageId, dispatch, successUpdate, props.history]);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);

        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
        dispatch(
            updateLanguage({
                _id: languageId,
                name,
                image,
                bugList,
            })
        )
    };

    return (
        <div>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Language {languageId}</h1>
                </div>

                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>

                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                        </div>
                        
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

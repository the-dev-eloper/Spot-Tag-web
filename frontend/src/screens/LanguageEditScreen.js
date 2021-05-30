import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsLanguage } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LanguageEditScreen(props) {

    const languageId = props.match.params.id;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [bugList, setBugList] = useState([]);

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!language || language._id !== languageId) {
            dispatch(detailsLanguage(languageId));
        } else {
            setName(language.name);
            setImage(language.image);
            setBugList(language.bugList);
        }
    }, [language, languageId, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
    };

    return (
        <div>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Language {languageId}</h1>
                </div>

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
                            <label htmlFor="bugList">BugList</label>
                            <input
                                id="bugList"
                                type="text"
                                placeholder="Enter Bug Name"
                                value={bugList.map((bug) => (
                                    bug.name
                                ))}
                                onChange={(e) => setBugList(e.target.value)}
                            ></input>
                            {/* <button
                                type="button"
                                className="small"
                                // onClick={() =>
                                //     props.history.push(`/language/${language._id}/edit`)    
                                // }
                            >
                                Edit Bugs
                            </button> */}
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

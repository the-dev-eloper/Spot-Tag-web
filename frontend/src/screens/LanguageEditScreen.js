import React, { useEffect, useState } from 'react';
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

    const deleteHandler = () => {
        // TODO: dispatch delete action
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

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Language</th>
                                        <th>reason</th>
                                        <th>Testing Tool</th>
                                        <th>Solution</th>
                                        <th>Ref Link</th>
                                        <th>Added By</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        bugList.map((bug) => (
                                            <tr key={bug._id}>

                                                <td>{bug.name}</td>
                                                <td>{bug.category}</td>
                                                <td>{bug.language}</td>
                                                <td>{bug.reason}</td>
                                                <td>{bug.testingTool}</td>
                                                <td>{bug.solution}</td>
                                                <td>{bug.refLink}</td>
                                                <td>{bug.addedBy}</td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() =>
                                                            props.history.push(`/bug/${bug._id}/edit`)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() => deleteHandler(language)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>      
                                        ))
                                    }
                                </tbody>
                            </table>
 
                            {/* {
                                bugList.map((bug) => (
                                    <label htmlFor="bugList">{bug.name}</label>
                                ))
                                    // <input
                                    //     id="bugList"
                                    //     type="text"
                                    //     placeholder="Enter Bug Name"
                                    //     value={bug.name}
                                    //     onChange={(e) => setBugList(e.target.value)}
                                    // ></input>
                                // ))
                            } */}
                            {/* <input
                                id="bugList"
                                type="text"
                                placeholder="Enter Bug Name"
                                value={bugList.map((bug) => (
                                    bug.name
                                ))}
                                onChange={(e) => setBugList(e.target.value)}
                            ></input> */}
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    createLanguage,
    deleteLanguage,
    listLanguages
} from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
    LANGUAGE_CREATE_RESET,
    LANGUAGE_DELETE_RESET 
} from '../constants/languageConstants';

export default function LanguageListScreen(props) {

    const languageList = useSelector((state) => state.languageList);
    const { loading, error, languages } = languageList;

    const languageCreate = useSelector((state) => state.languageCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        language: createdLanguage
    } = languageCreate;

    const languageDelete = useSelector((state) => state.languageDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = languageDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: LANGUAGE_CREATE_RESET });
            props.history.push(`/language/${createdLanguage._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: LANGUAGE_DELETE_RESET });
        }
        dispatch(listLanguages());
    }, [createdLanguage, dispatch, props.history, successCreate, successDelete]);

    const createHandler = () => {
        dispatch(createLanguage());
    }

    const deleteHandler = (language) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteLanguage(language._id));
        }
    };

    return (
        <div>
            <div className="row">

                <h1>Langages</h1>

                <button type="button" className="primary" onClick={createHandler}>
                    Create New Language
                </button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <table className="table">

                        <thead>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Options</th>
                        </thead>

                        <tbody>
                            {languages.map((language) => (
                                <tr key={language._id}>

                                    <td>
                                        <Link to={`/language/${language._id}`}>
                                            {language.name}
                                        </Link>
                                    </td>

                                    <td>{language.image}</td>

                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() =>
                                                props.history.push(`/language/${language._id}/edit`)
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
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

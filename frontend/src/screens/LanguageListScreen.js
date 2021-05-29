import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLanguages } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LanguageListScreen(props) {

    const languageList = useSelector((state) => state.languageList);
    const { loading, error, languages } = languageList;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listLanguages());
    }, [dispatch]);

    const deleteHandler = () => {
        /// TODO: dispatch delete action
    };

    return (
        <div>

            <h1>Langages</h1>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Options</th>
                    </thead>

                    <tbody>
                        {languages.map((language) => (
                            <tr key={language._id}>
                                <td>{language.name}</td>
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
            )}
        </div>
    );
}

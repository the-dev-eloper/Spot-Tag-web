import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLanguages } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BugListScreen(props) {

    const languageList = useSelector((state) => state.languageList);
    const { loading, error, languages } = languageList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listLanguages);
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
                        <th>Category</th>
                        <th>Language</th>
                        <th>reason</th>
                        <th>Testing Tool</th>
                        <th>Solution</th>
                        <th>Ref Link</th>
                        <th>Added By</th>
                        <th>Options</th>
                    </thead>

                    <tbody>
                        {languages.bugList.map((bug) => (
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
                                        onClick={() => deleteHandler(bug)}
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

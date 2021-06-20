import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBug, listBugs } from '../actions/bugActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BUG_CREATE_RESET } from '../constants/bugConstants';

export default function BugListScreen(props) {

    const bugList = useSelector((state) => state.bugList);
    const { loading, error, bugs } = bugList;

    const bugCreate = useSelector((state) => state.bugCreate);
    const {
        loading: loadingCreate,
        success: successCreate,
        error: errorCreate,
        bug: createdBug
    } = bugCreate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: BUG_CREATE_RESET });
            props.history.push(`/bug/${createdBug._id}/edit`);
        }
       dispatch(listBugs());
    }, [createdBug, dispatch, props.history, successCreate]);

    const createHandler = () => {
        dispatch(createBug());
    }

    const deleteHandler = () => {
        
    };

    return (
        <div>
            <div className="row">

                <h1>Bugs</h1>

                <button type="button" className="primary" onClick={createHandler}>
                    Create New Bug
                </button>
            </div>

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <table className="table">

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
                            {bugs.map((bug) => (
                                <tr key={bug._id}>

                                    <td>{bug.name}</td>
                                    <td>{bug.category}</td>
                                    <td>{bug.language}</td>
                                    <td>{bug.reason}</td>
                                    <td>{bug.testingTool}</td>
                                    <td>{bug.solution}</td>

                                    <td>
                                        <a href={bug.refLink}>
                                            click here
                                        </a>
                                    </td>

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
                </div>       
 
                )
            }
        </div>
    );
}

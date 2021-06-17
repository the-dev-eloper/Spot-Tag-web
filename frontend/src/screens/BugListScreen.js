import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBugs } from '../actions/bugActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BugListScreen(props) {

    const bugList = useSelector((state) => state.bugList);
    const { loading, error, bugs } = bugList;

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(listBugs());
    }, [dispatch]);

    const createHandler = () => {
        
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

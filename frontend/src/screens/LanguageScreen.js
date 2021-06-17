import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsLanguage } from '../actions/languageActions';
import { detailsUser } from '../actions/userActions';
import { listBugs } from '../actions/bugActions';

export default function LanguageScreen(props) {

    const [isAdmin, setIsAdmin] = useState(false);
    const userId = props.match.params.id;

    const dispatch = useDispatch();
    const languageId = props.match.params.id;

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const bugList = useSelector((state) => state.bugList);
    const { loadingBugs, errorBugs, bugs } = bugList;

    useEffect(() => {
        dispatch(detailsLanguage(languageId));
        dispatch(listBugs());
    }, [dispatch, languageId]);

    return (
        <div>

            {loadingBugs && <LoadingBox></LoadingBox>}
            {errorBugs && <MessageBox variant="danger">{errorBugs}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>

                    <Link to="/">Back to result</Link>

                    <div class="grid-container">
                        <h1>
                            {language.name}
                        </h1>

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
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    bugs ? (
                                        bugs.map((bug) => (
                                            bug.language == language.name ? (
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
                                                </tr>
                                            ) : (
                                                <tr></tr>
                                            )
                                        ))
                                    ) : (
                                        <tr></tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

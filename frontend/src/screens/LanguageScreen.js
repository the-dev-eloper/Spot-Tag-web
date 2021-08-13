import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsLanguage } from '../actions/languageActions';
import { listBugs } from '../actions/bugActions';

export default function LanguageScreen(props) {

    const dispatch = useDispatch();
    const languageId = props.match.params.id;

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;

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

                        <div>
                            <h3>First Appeared: {language.firstAppeared}</h3>
                            <h3>Developer: {language.developer}</h3>
                            <h3>Stable Release: {language.stableRelease}</h3>
                        </div>

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
                                            bug.language === language.name ? (
                                                <tr key={bug._id}>
    
                                                    <td>
                                                        <Link to={`/bug/${bug._id}`}>
                                                            {bug.name}
                                                        </Link>
                                                    </td>
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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsLanguage } from '../actions/languageActions';

export default function LanguageScreen(props) {

    const dispatch = useDispatch();
    const languageId = props.match.params.id;

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;

    useEffect(() => {
        dispatch(detailsLanguage(languageId));
    }, [dispatch, languageId]);

    return (
        <div>

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
                                {language.bugList.map((bug) => (
                                    <tr key={bug._id}>
                                        <td>{bug.name}</td>
                                        <td>{bug.category}</td>
                                        <td>{bug.language}</td>
                                        <td>{bug.reason}</td>
                                        <td>{bug.testingTool}</td>
                                        <td>{bug.solution}</td>
                                        <td>{bug.refLink}</td>
                                        <td>{bug.addedBy}</td>
                                    </tr>      
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

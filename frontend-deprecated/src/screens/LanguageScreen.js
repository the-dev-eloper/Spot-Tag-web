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
        <div className='body--language'>

            {loadingBugs && <LoadingBox></LoadingBox>}
            {errorBugs && <MessageBox variant="danger">{errorBugs}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <section class="language--contents">

                    <div class="language__contents--details">
                        <div class="language__details--logo">
                            <img src={language.image} alt="" />
                        </div>

                        <div class="language__details--languageInfo">

                            <div class="language__info--nameSection">
                                <h2>
                                    {language.name}
                                </h2>
                                <h5>
                                    {/* ToDo: {language.description} */}
                                    Language Description
                                </h5>
                            </div>

                            <div class="language__info--additional">

                                <div class="language__additional--cols">

                                    <div class="language_parameters">
                                        <h3>
                                            Developer:
                                        </h3>

                                        <h4>
                                            {language.developer}
                                        </h4>
                                    </div>

                                    <div class="language_parameters">
                                        <h3>
                                            Stable Release:
                                        </h3>

                                        <h4>
                                            {language.stableRelease}
                                        </h4>
                                    </div>
                                </div>

                                <div class="language__additional--cols">
                                    <div class="language_parameters">
                                        <h3>
                                            First Appeared:
                                        </h3>

                                        <h4>
                                            {language.firstAppeared}
                                        </h4>
                                    </div>

                                    <div class="language_parameters">
                                        <h3>
                                            Paradigm:
                                        </h3>

                                        <h4>
                                            {/* ToDo: Language Paradigm */}
                                            Language Paradigm
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="language__contents--bugLists">

                        <table class="bugsTable">
                            <caption>Bugs and Solutions</caption>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Language</th>
                                    <th>Reason</th>
                                    <th>Testing Tool</th>
                                    <th>Solution</th>
                                    <th>Referral Link</th>
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
                                                    <td>Admin</td>
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
                </section>
            )}
        </div>
    );
}

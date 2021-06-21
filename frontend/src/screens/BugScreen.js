import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsBug, listBugs } from '../actions/bugActions';

export default function BugScreen(props) {

    const bugId = props.match.params.id;

    const bugDetails = useSelector((state) => state.bugDetails);
    const { loading, error, bug } = bugDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsBug(bugId));
    }, [dispatch, bugId]);

    return (
        <div>

            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>

                        <Link to="/bugs">Back to result</Link>

                        <div className="grid-container">

                            <h1>
                                {bug.name}
                            </h1>

                            <div className="col-1">
                                <ul>
                                
                                    <li>
                                        <b>
                                            Category: 
                                        </b>
                                        {bug.category}
                                    </li>

                                    <li>
                                        <b>
                                            Language: 
                                        </b>
                                        {bug.language}
                                    </li>

                                    <li>
                                        <b>
                                            Reason: 
                                        </b>
                                        {bug.reason}
                                    </li>

                                    <li>
                                        <b>
                                            Testing Tool: 
                                        </b>
                                        {bug.testingTool}
                                    </li>

                                    <li>
                                        <b>
                                            Solution: 
                                        </b>
                                        {bug.solution}
                                    </li>

                                    <li>
                                        <b>
                                            Ref Link:
                                        </b>
                                        {bug.refLink}
                                    </li>

                                    <li>
                                        <b>
                                            Added By:
                                        </b>
                                        {bug.addedBy}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

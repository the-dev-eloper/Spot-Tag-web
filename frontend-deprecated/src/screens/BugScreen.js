import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { detailsBug } from '../actions/bugActions';

export default function BugScreen(props) {

    const bugId = props.match.params.id;

    const bugDetails = useSelector((state) => state.bugDetails);
    const { loading, error, bug } = bugDetails;

    const dispatch = useDispatch();

    const gotoBugs = () => {
        props.history.push(`/bugs`);
    }

    useEffect(() => {
        dispatch(detailsBug(bugId));
    }, [dispatch, bugId]);

    return (
        <div className='bugDetails--body'>

            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <section className="bugDetails">

                        <div className="bug__details--header">
                            <h2>Bug Details</h2>
                        </div>

                        <div className="bug__details--buttonSection">
                            <button onClick={gotoBugs}>View All Bugs</button>
                        </div>

                        <div className="bug__details--modalSection">
                            <div className="bugModal">

                                <div className="bugModal--header">
                                    <h2>{bug.name}</h2>
                                    <h5>{bug.language}</h5>
                                </div>

                                <div className="bugDetails--table">
                                    <table>

                                        <tr>
                                            <td>
                                                <h4>Category :</h4>
                                            </td>
                                            <td>
                                                <p>{bug.category}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h4>Reason :</h4>
                                            </td>
                                            <td>
                                                <p>{bug.reason}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h4>Testing Tool :</h4>
                                            </td>
                                            <td>
                                                <p>{bug.testingTool}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h4>Solution :</h4>
                                            </td>
                                            <td>
                                                <p>{bug.solution}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h4>Referral Link :</h4>
                                            </td>
                                            <td>
                                                <a href={bug.refLink}>Click here</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    );
}

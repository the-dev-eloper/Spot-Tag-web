import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import data from '../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listBugs } from '../actions/bugActions';

export default function BugScreen() {

    const dispatch = useDispatch();

    const bugList = useSelector((state) => state.bugList);
    const { loading, error, bugs } = bugList;

    useEffect(() => {
       dispatch(listBugs());
    }, [])

    return (
        <div class="grid-container">

            <h1>All Bugs</h1>

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

                {
                    loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <tbody>
                            {
                                bugs.map((bug) => (
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
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </div> 
    );
}

import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import data from '../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BugScreen() {

    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                const { data } = await Axios.get('/api/bugs');
                setLoading(false);
                setBugs(data);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
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
                                                {bug.refLink}
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

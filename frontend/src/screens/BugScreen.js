import React from 'react'
import data from '../data';

export default function BugScreen() {
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

                <tbody>
                    {
                        data.bugs.map((bug) => (
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
            </table>
        </div> 
    );
}

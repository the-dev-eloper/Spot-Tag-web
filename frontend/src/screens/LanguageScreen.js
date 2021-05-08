import React from 'react'
import { Link } from 'react-router-dom';
import data from '../data';

export default function LanguageScreen(props) {

    const language = data.languages.find((x) => x._id === props.match.params.id);

    if (!language) {
        return <div> Language Not Found</div>;
    }

    return (
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
                            <th>Options</th>
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
                                <td>
                                    <a href="/editBug" class="button">Edit</a>
                                    <a href="/" class="button">Delete</a>
                                </td>
                            </tr>                            
                        ))}
                    </tbody>

                    {/* <tbody>
                        <tr>
                            <td>{bug.name}</td>
                            <td>{bug.category}</td>
                            <td>{bug.language}</td>
                            <td>{bug.reason}</td>
                            <td>{bug.testingTool}</td>
                            <td>{bug.solution}</td>
                            <td>{bug.refLink}</td>
                            <td>{bug.addedBy}</td>
                            <td>
                                <a href="#" class="button">Edit</a>
                                <a href="#" class="button">Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td>{bug.name}</td>
                            <td>{bug.category}</td>
                            <td>{bug.language}</td>
                            <td>{bug.reason}</td>
                            <td>{bug.testingTool}</td>
                            <td>{bug.solution}</td>
                            <td>{bug.refLink}</td>
                            <td>{bug.addedBy}</td>
                            <td>
                                <a href="#" class="button">Edit</a>
                                <a href="#" class="button">Delete</a>
                            </td>
                        </tr>
                    </tbody>  */}
                </table> 
            </div>

        </div>
    );
}

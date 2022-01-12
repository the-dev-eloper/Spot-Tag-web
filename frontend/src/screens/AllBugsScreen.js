import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listBugs } from '../actions/bugActions';

export default function AllBugsScreen() {

    const dispatch = useDispatch();

    const bugList = useSelector((state) => state.bugList);
    const { loading, error, bugs } = bugList;

    useEffect(() => {
       dispatch(listBugs());
    }, [dispatch])

    return (
        <div class="body--bugs">

            <section class="bugs--content">

                <div class="bugs__content--header">
                    <h2>All Bugs</h2>
                </div>

                <div class="bug__contents--buttonSection">
                    <button>View Languages</button>
                </div>

                <div class="bug__contents--tableSection">

                    <table class="bugsTable">
                        <caption>Bugs and Solutions</caption>

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
                                        ))
                                    }
                                </tbody>
                            )
                        }
                    </table>                  
                </div>
            </section>
        </div>
    );
}

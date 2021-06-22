import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsBug, updateBug } from '../actions/bugActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BUG_UPDATE_RESET } from '../constants/bugConstants';

export default function BugEditScreen(props) {

    const bugId = props.match.params.id;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [reason, setReason] = useState('');
    const [testingTool, setTestingTool] = useState('');
    const [solution, setSolution] = useState('');
    const [refLink, setRefLink] = useState('');
    const [addedBy, setAddedBy] = useState('');

    const bugDetails = useSelector((state) => state.bugDetails);
    const { loading, error, bug } = bugDetails;

    const bugUpdate = useSelector((state) => state.bugUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = bugUpdate;

    const dispatch = useDispatch();

    useEffect(() => {

        if(successUpdate) {
            props.history.push('/buglist');
        }

        if (!bug || bug._id !== bugId || successUpdate) {
            dispatch({ type: BUG_UPDATE_RESET });
            dispatch(detailsBug(bugId));
        } else {
            setName(bug.name);
            setCategory(bug.category);
            setLanguage(bug.language)
            setReason(bug.reason);
            setTestingTool(bug.testingTool);
            setSolution(bug.solution);
            setRefLink(bug.refLink)
            setAddedBy(bug.addedBy)
        }
    }, [bug, bugId, dispatch, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateBug({
                _id: bugId,
                name,
                category,
                language,
                reason,
                testingTool,
                solution,
                refLink,
                addedBy
            })
        );
    };

    return (
        <div>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Bug {bugId}</h1>
                </div>

                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="language">Language</label>
                            <input
                                id="language"
                                type="text"
                                placeholder="Enter language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="reason">Reason</label>
                            <input
                                id="reason"
                                type="text"
                                placeholder="Enter reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="testingTool">Testing Tool</label>
                            <input
                                id="testingTool"
                                type="text"
                                placeholder="Enter Testing Tool"
                                value={testingTool}
                                onChange={(e) => setTestingTool(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="solution">Solution</label>
                            <input
                                id="solution"
                                type="text"
                                placeholder="Enter Solution"
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="refLink">refLink</label>
                            <input
                                id="refLink"
                                type="text"
                                placeholder="Enter refLink"
                                value={refLink}
                                onChange={(e) => setRefLink(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="addedBy">Added By</label>
                            <input
                                id="addedBy"
                                type="text"
                                placeholder="Enter Added By"
                                value={addedBy}
                                onChange={(e) => setAddedBy(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsLanguage } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function BugEditScreen(props) {

    const bugId = props.match.params.id;

    const [bugName, setBugName] = useState('');
    const [bugCategory, setBugCategory] = useState('');
    const [bugReason, setBugReason] = useState('');
    const [bugTestingTool, setBugTestingTool] = useState('');
    const [bugSolution, setBugSolution] = useState('');
    const [bugRefLink, setBugRefLink] = useState('');
    const [bugAddedBy, setBugAddedBy] = useState('');

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!language || language._id !== languageId) {
    //         dispatch(detailsLanguage(languageId));
    //     } else {
    //         setName(language.name);
    //         setImage(language.image);
    //         setBugList(language.bugList);
    //     }
    // }, [language, languageId, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
    };

    return (
        <div>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Bug {bugId}</h1>
                </div>

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
                                value={bugName}
                                onChange={(e) => setBugName(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={bugCategory}
                                onChange={(e) => setBugCategory(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="reason">Reason</label>
                            <input
                                id="reason"
                                type="text"
                                placeholder="Enter reason"
                                value={bugReason}
                                onChange={(e) => setBugReason(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="testingTool">Testing Tool</label>
                            <input
                                id="testingTool"
                                type="text"
                                placeholder="Enter Testing Tool"
                                value={bugTestingTool}
                                onChange={(e) => setBugTestingTool(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="solution">Solution</label>
                            <input
                                id="solution"
                                type="text"
                                placeholder="Enter Solution"
                                value={bugSolution}
                                onChange={(e) => setBugSolution(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="refLink">refLink</label>
                            <input
                                id="refLink"
                                type="text"
                                placeholder="Enter refLink"
                                value={bugRefLink}
                                onChange={(e) => setBugRefLink(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="addedBy">Added By</label>
                            <input
                                id="addedBy"
                                type="text"
                                placeholder="Enter Added By"
                                value={bugAddedBy}
                                onChange={(e) => setBugAddedBy(e.target.value)}
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
    )
}

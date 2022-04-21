import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { listLanguages } from '../actions/languageActions';

import Language from '../components/Language'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { Button } from "antd";
import { BugFilled } from "@ant-design/icons";

export default function HomeScreen(props) {

    const dispatch = useDispatch();

    const languageList = useSelector((state) => state.languageList);
    const { languages, loading, error } = languageList;

    useEffect(() => {
        dispatch(listLanguages());
    }, [dispatch]);

    const gotoBugs = () => {
        props.history.push(`/bugs`);
    }

    return (
        <section class="homeBlock">

            <div class="homeBlock--header">
                <h2>Languages</h2>
            </div>

            <div class="homeBlock--buttonSection">
                <Button
                    type="primary"
                    shape="round"
                    icon={ <BugFilled /> }
                    size='large'
                    onClick={gotoBugs}
                >
                    View All Bugs
                </Button>
            </div>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div class="homeBlock--languages">

                    {languages.map((language) => (
                        <Language key={language._id} language={language} />
                    ))}
                </div>
            )}
        </section>
    );
}

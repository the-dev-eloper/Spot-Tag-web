import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLanguages } from '../actions/languageActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BugListScreen(props) {

    return (
        <div>
            <h1>Bugs</h1>           
        </div>
    );
}

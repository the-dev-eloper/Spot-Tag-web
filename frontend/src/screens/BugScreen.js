import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import data from '../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listBugs } from '../actions/bugActions';

export default function BugScreen(props) {

    const bugId = props.match.params.id;

    return (
        <div class="grid-container">

            <Link to="/">Back to result</Link>

            <div class="grid-container">

                <h1>
                    {bugId}
                </h1>
            </div>
        </div> 
    );
}

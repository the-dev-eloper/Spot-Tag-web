import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LanguageEditScreen() {

    const languageDetails = useSelector((state) => state.languageDetails);
    const { loading, error, language } = languageDetails;
    const dispatch = useDispatch();

    return (
        <div>
            Edit Language 
        </div>
    )
}

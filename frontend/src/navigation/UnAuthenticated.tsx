import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../modules/User/Login';
import { Signup } from '../modules/User/Signup';

export const UnAuthenticated = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

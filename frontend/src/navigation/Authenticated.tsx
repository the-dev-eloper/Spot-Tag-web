import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components';
import { Bugs } from '../modules/Bugs';
import Bug from '../modules/Bugs/Bug';
import { Home } from '../modules/Home';
import { Language } from '../modules/Language';

export const Authenticated = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/language/:id" element={<Language />} />
                <Route path="/bugs" element={<Bugs />} />
                <Route path="/bug/:id" element={<Bug />} />
            </Routes>
        </>
    );
};

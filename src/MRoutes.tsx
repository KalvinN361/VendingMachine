import React from 'react';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
// import {
//     Login,
//     Result,
//     CoinInventory,
//     Burn,
//     Accordion,
//     accordionData,
//     //    Profile,
//     TransferPage,
//     ViewContracts,
//     OpenEdition,
// } from '@pages/index';

const MRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
        </Routes>
    );
};

export default MRoutes;

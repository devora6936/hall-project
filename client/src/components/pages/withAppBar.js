// AppLayout.jsx
import React from 'react';
import AppBAr from '../appBar';
import { Outlet } from 'react-router-dom';

const AppLayout = ({ children }) => {
    return (
        <div>
            <AppBAr />
            {children}
            <Outlet/>
        </div>
    );
}

export default AppLayout;

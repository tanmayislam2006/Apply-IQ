import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            this is main layout
            <Outlet />
        </div>
    );
};

export default MainLayout;
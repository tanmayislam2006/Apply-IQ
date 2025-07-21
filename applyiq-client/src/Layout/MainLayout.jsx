import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <main className='max-w-7xl mx-auto px-4'>
          <div className="h-min-[calc(100vh-200px)] ">
            <Outlet />
          </div>
          
        </main>
    );
};

export default MainLayout;
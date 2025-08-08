import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navabar/Navbar';

const MainLayout = () => {
    return (
        <main className=''>
          <Navbar/>
          <div className="h-min-[calc(100vh-200px)] ">
            <Outlet />
          </div>
          <Footer/>
        </main>
    );
};

export default MainLayout;
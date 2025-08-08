import React from 'react';
import ApplyIQ from '../Components/ApplyIQ/ApplyIQ';
import { Outlet } from 'react-router';

const AuthenticaionLayout = () => {
    return (
         <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Form section */}
      <div className="w-full  flex flex-col">
        {/* Optional brand header at top */}
        <div className="p-6">
          <ApplyIQ/>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default AuthenticaionLayout;
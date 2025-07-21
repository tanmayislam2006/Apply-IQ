import React from 'react';
import useAuthProvider from '../../Hooks/useAuthProvider';

const Home = () => {
    const {name}=useAuthProvider()
    console.log(name);
    return (
        <div>
            this is home page   {name}
        </div>
    );
};

export default Home;
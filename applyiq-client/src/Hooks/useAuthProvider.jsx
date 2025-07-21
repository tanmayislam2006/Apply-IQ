import React, { useContext } from 'react';
import ApplyIqContext from '../Context/ApplyIqContex';

const useAuthProvider = () => {
 const sharedData=useContext(ApplyIqContext)
 return sharedData
};

export default useAuthProvider;
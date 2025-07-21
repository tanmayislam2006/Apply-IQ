import React, { useContext } from 'react';
import ApplyIqContext from '../Context/ApplyIqContex';

const useAuthProvider = () => {
 const shareData=useContext(ApplyIqContext)
 return shareData
};

export default useAuthProvider;
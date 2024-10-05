import React,{useEffect} from 'react'; 
import { useUserAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
  const { user } = useUserAuth();
  useEffect(()=>{
    alert(user?.phoneNumber)
  },[user])
  if (!user && (user?.phoneNumber!=='+96176032809'||user?.phoneNumber!=='+96171800791')) {
    return <p>d</p>;
  }

  return children;
};

export default Protected;
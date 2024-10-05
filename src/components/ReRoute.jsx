import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReRoute = ({ PathRoute }) => {
  const navigate = useNavigate();

  useEffect(()=>{

    const handleNavigate = () => {
        // Navigate to the parent directory
        navigate(-1);
    
        // Navigate to the specified route
        alert(PathRoute)
        navigate(`./${PathRoute}`);
      };
      handleNavigate()
  },[])

  return (
    <button> 
    </button>
  );
};

export default ReRoute; 

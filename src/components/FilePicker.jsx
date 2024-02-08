import React, { useState ,useEffect} from 'react'
import AccCard from './AccCard'
import '../css/FilePicker.css'
import { useLocation } from 'react-router-dom';
export default function FilePicker({accFiles}) {
  const location = useLocation();
  const [acceptedFiles,setaccFiles]=useState(accFiles)
  useEffect(()=>{
    console.log(location)
    const stringWithSpaces = location?.pathname.replace(/%20/g, ' ');
    console.log(stringWithSpaces)
    const pathArray = stringWithSpaces.split('/').filter(Boolean); 
    // accFiles?.fil((accFile)=>{
    //   accFile.
    // })
console.log(pathArray); 
  },[location]) 
  return (
    <div className='filesCont'>
         {acceptedFiles.map(function (accFile, index){
       return  <AccCard fileData={accFile} /> 
})}

    </div>
  )
}

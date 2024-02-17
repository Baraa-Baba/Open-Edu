import React, { useState ,useEffect} from 'react'
import AccCard from './AccCard'
import '../css/FilePicker.css'
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar' 
import NoFiles from '../components/NoFiles'
import Footer from "../components/Footer"; 
export default function FilePicker({accFiles}) {
  const location = useLocation();
  const [acceptedFiles,setaccFiles]=useState([])
  useEffect(()=>{
    console.log(accFiles)
    console.log(location)
    const stringWithSpaces = location?.pathname.replace(/%20/g, ' ');
    console.log('stringWithSpaces')
    const pathArray = stringWithSpaces.split('/').filter(Boolean); 

    let pathArrayLower = pathArray.map(element => element.toLowerCase());

    let filteredAccFIles = accFiles?.filter((accFile)=>{  
      let allTags = [...accFile?.folderTags?.secs,...accFile?.folderTags?.units,...accFile?.folderTags?.lessons
        ,...accFile?.folderTags?.ApplicationTypes,accFile?.folderTags?.subject]
        let allTagsLower = allTags.map(element => element.toLowerCase());

        const isSubset = (array1, array2) =>
  array2.every((element) => array1.includes(element.toLowerCase()));
  console.log(pathArrayLower,allTagsLower)
        let isAcepted = isSubset(allTagsLower,pathArrayLower); 
        return isAcepted
    })
    console.log(filteredAccFIles)
    setaccFiles(filteredAccFIles)
console.log(filteredAccFIles); 
  },[location]) 
  useEffect(()=>{
    console.log(acceptedFiles)
  },[acceptedFiles])
  return (
    <>
    <Navbar />
    <div className='filesCont'>
         {acceptedFiles[0]?.fileName  ? acceptedFiles?.map(function (accFile, index){
       return  <AccCard fileData={accFile} /> 

 })
 :<NoFiles />
} 
    </div>
    <Footer />
    </>
  )
}

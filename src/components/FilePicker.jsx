import React, { useState ,useEffect} from 'react'
import AccCard from './AccCard'
import '../css/FilePicker.css'
import { useLocation } from 'react-router-dom';
export default function FilePicker({accFiles}) {
  const location = useLocation();
  const [acceptedFiles,setaccFiles]=useState([])
  useEffect(()=>{
    console.log(location)
    const stringWithSpaces = location?.pathname.replace(/%20/g, ' ');
    console.log(stringWithSpaces)
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
        if(isAcepted) alert('yo')
        return isAcepted
    })
    setaccFiles(filteredAccFIles)
console.log(filteredAccFIles); 
  },[location]) 
  return (
    <div className='filesCont'>
         {acceptedFiles?.map(function (accFile, index){
       return  <AccCard fileData={accFile} /> 
})}
   <style jsx>{`
            footer{
              position:fixed;
              width:100%;
              bottom:0
            }
            #root{
              min-height:100vh
            }
          `}</style>
    </div>
  )
}

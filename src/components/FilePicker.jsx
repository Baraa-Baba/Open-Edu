import React, { useState ,useEffect} from 'react'
import AccCard from './AccCard'
import ReRoute from './ReRoute.jsx'
import '../css/FilePicker.css'
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar' 
import NoFiles from '../components/NoFiles'
import Footer from "../components/Footer"; 
export default function FilePicker({accFiles,isExam}) {
  const location = useLocation();
  const [notRuned,setnotRuned] =useState(true)
  const [reRoute,setReRoute]=useState(false)
  const [acceptedFiles,setaccFiles]=useState([]) 
  const [PathRoute,setPathRoute]=useState('')
  useEffect(()=>{
    console.log(accFiles)
  },[accFiles])
  function init(){
    setnotRuned(false)
    if(isExam){ 
      function checkIfExam(){ 
          accFiles.forEach((file)=>{ 
            if(file?.folderTags?.units?.length !== 1){ 
            }else{
              let index = file?.folderTags?.ApplicationTypes?.indexOf('exams');
              if (index !== -1) {
                file?.folderTags?.ApplicationTypes?.splice(index, 1);
              } 
            }
          }) 
      }
      checkIfExam()
      const stringWithSpaces = location?.pathname.replace(/%20/g, ' '); 
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
      setPathRoute(pathArrayLower[pathArrayLower.length-1])
      setaccFiles(filteredAccFIles) 
    }else{ 
    const stringWithSpaces = location?.pathname.replace(/%20/g, ' '); 
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
    setaccFiles(filteredAccFIles) 
  }
  }
  useEffect(()=>{
    init()
  },[location,accFiles?.length]) 
  useEffect(()=>{ 
    if(notRuned&&acceptedFiles[0]?.fileName){ 
        init() 
    }
  },[acceptedFiles,notRuned])
  useEffect(()=>{
  
  },[acceptedFiles])
  return (
    <>
    <Navbar />
    <div className='filesCont'>
         {acceptedFiles[0]?.fileName  ? acceptedFiles?.map(function (accFile, index){
       return  <AccCard fileData={accFile}  /> 

 })
 :<NoFiles />
}  
    </div>
    <Footer />
    </>
  )
}

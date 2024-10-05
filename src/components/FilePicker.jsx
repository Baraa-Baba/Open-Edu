import React, { useState ,useEffect} from 'react'
import AccCard from './AccCard'
import ReRoute from './ReRoute.jsx'
import '../css/FilePicker.css'
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar' 
import NoFiles from '../components/NoFiles'
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
import Footer from "./Footer"; 
import { useUserAuth } from '../context/AuthContext';
export default function FilePicker({isExam}) {
  const {AccFiles}=useUserAuth()
  const location = useLocation();
  const [notRuned,setnotRuned] =useState(true)
  const [reRoute,setReRoute]=useState(false)
  const [acceptedFiles,setaccFiles]=useState(AccFiles) 
  const [PathRoute,setPathRoute]=useState('') 
  
  useEffect(()=>{
    if(!acceptedFiles[0]?.fileName){ 
      let AceppetedFiles=[]
      async function getMarker(){
        alert('yolo filePicker')
        const querySnapshot = await getDocs(collection(db, "fileData"));
        querySnapshot.forEach((doc) => { 
          if(doc.data()&&doc.data().STATUS === 'ACCEPTED'){
              AceppetedFiles.push(doc.data()) 
          }
          
      });

      }
      async function fetchDataAndInit() {
        if(!AceppetedFiles){
        await getMarker(); 
        }
        setaccFiles(AceppetedFiles); 
        init();
    }
    
    fetchDataAndInit();
    }
  },[])
  function init(){
    setnotRuned(false)
    if(isExam){ 
      function checkIfExam(){ 
          AccFiles.forEach((file)=>{ 
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
  
      let filteredAccFIles = AccFiles?.filter((accFile)=>{  
        let allTags = [...accFile?.folderTags?.secs,...accFile?.folderTags?.units,...accFile?.folderTags?.lessons
          ,...accFile?.folderTags?.ApplicationTypes,accFile?.folderTags?.subject]
          let allTagsLower = allTags.map(element => element.toLowerCase());
  
          const isSubset = (array1, array2) =>
    array2.every((element) => array1.includes(element.toLowerCase()));
          let isAcepted = isSubset(allTagsLower,pathArrayLower); 
          return isAcepted
      }) 
      setPathRoute(pathArrayLower[pathArrayLower.length-1])
      setaccFiles(filteredAccFIles) 
    }else{ 
    const stringWithSpaces = location?.pathname.replace(/%20/g, ' '); 
    const pathArray = stringWithSpaces.split('/').filter(Boolean); 

    let pathArrayLower = pathArray.map(element => element.toLowerCase());

    let filteredAccFIles = AccFiles?.filter((accFile)=>{  
      let allTags = [...accFile?.folderTags?.secs,...accFile?.folderTags?.units,...accFile?.folderTags?.lessons
        ,...accFile?.folderTags?.ApplicationTypes,accFile?.folderTags?.subject]
        let allTagsLower = allTags.map(element => element.toLowerCase());

        const isSubset = (array1, array2) =>
  array2.every((element) => array1.includes(element.toLowerCase()));
        let isAcepted = isSubset(allTagsLower,pathArrayLower); 
        return isAcepted
    }) 
    setaccFiles(filteredAccFIles) 
  }
  }
  useEffect(()=>{
    init()
  },[location,AccFiles?.length]) 
  useEffect(()=>{ 
    if(notRuned&&acceptedFiles[0]?.fileName){ 
        init() 
    }
  },[acceptedFiles,notRuned])
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

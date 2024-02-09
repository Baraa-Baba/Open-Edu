import React,{ useEffect, useState } from "react"; 

import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
import { Link } from 'react-router-dom'
import PendingCard from '../components/PendingCard';
import { useUserAuth } from '../context/AuthContext';
function Admin() { 
  const { user } = useUserAuth();
    const [PendingFiles,setPendingFiles]=useState([{fileName:'loading...'}])
    const [showAdmin,setShowAdmin]=useState(false)
    useEffect(()=>{ 
      if(user?.phoneNumber!=='+96176032809'||user?.phoneNumber!=='+96171800791'){
        setShowAdmin(true)
      }
    },[user])
  useEffect(()=>{
    let pendingFiles=[]
    async function getMarker(){
      const querySnapshot = await getDocs(collection(db, "fileData"));
      querySnapshot.forEach((doc) => { 
        if(doc.data()&&doc.data().STATUS === 'PENDING'){
            pendingFiles.push(doc.data())
            setPendingFiles(pendingFiles)
        }
        
    });
  }
    getMarker()   
  console.log(pendingFiles)
  },[])
  useEffect(()=>{
    console.log(PendingFiles)
  },[PendingFiles]) 
  return (
    <>
    Admin 
  {showAdmin?  <>
   {PendingFiles.map(function (pendingFile, index){
       return  <PendingCard fileData={pendingFile} /> 
})} 
    </>:<>loading...</>}

    </>
  )
}

export default Admin

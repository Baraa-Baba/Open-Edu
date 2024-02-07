import { useEffect, useState } from 'react' 
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
import { Link } from 'react-router-dom'
import PendingCard from '../components/PendingCard';
function Admin() { 
    const [PendingFiles,setPendingFiles]=useState([{fileName:'loading...'}])
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
    {PendingFiles.map(function (pendingFile, index){
       return  <PendingCard fileData={pendingFile} /> 
})}

    </>
  )
}

export default Admin

import React, { useEffect, useState } from 'react' 
import '../css/pendingCard.css'
import { collection, addDoc, setDoc,doc , getDocs,getDoc , deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { getStorage, ref, deleteObject } from "firebase/storage"; 
import { storage } from '../firebase';
export default function PendingCard({fileData}) {
  const [hideCard,setHideCard]=useState(false)
    useEffect(()=>{
        console.log(fileData)
    },[])
    async function handleAcception(){
      try{
      const docRef = await setDoc(doc(db, "fileData",fileData.fileID), 
      {
        STATUS:'ACCEPTED', 
      },{merge:true}
      );
      setHideCard(true)  
    }catch(e){
      alert(e)
    } 
    }
    async function handleReject(){
      // Create a reference to the file to delete
      const desertRef = ref(storage, `files/${fileData?.fileID}`);

      // Delete the file
      deleteObject(desertRef).then(() => {
         
      }).catch((error) => { 
        alert(error)
      });
      await deleteDoc(doc(db, "fileData", fileData?.fileID));
      setHideCard(true)
    }
  return (
    <div class="fileContainer" style={{display:`${hideCard?'none':'block'}`}}>
    <p class="fileInfo">
        File Name: <span className='fileDataSpan'>{fileData.fileName}</span> <br />
        ID: <span className='fileDataSpan'>{fileData.fileID}</span> <br />
        Author's Name: <span className='fileDataSpan'>{fileData.authorsName}</span> <br />
        Sender's Name: <span className='fileDataSpan'>{fileData.sendersName}</span>
    </p>
    <p class="tagInfo">Secs: <span className='fileDataSpan'>{fileData.folderTags?.secs.join(', ')}</span></p>
    <p class="tagInfo">Subject: <span className='fileDataSpan'>{fileData.folderTags?.subject}</span></p>
    <p class="tagInfo">Units: <span className='fileDataSpan'>{fileData.folderTags?.units.join(', ')}</span></p>
    <p class="tagInfo">Lessons: <span className='fileDataSpan'>{fileData.folderTags?.lessons?.join(', ')}</span></p>
    <a class="fileLink" target="_blank" href={fileData?.fileURL}>View File</a>
    <div class="buttonsCont">
        <button class="rejectButton" onClick={()=>handleReject()} >Reject</button>
        <button class="acceptButton" onClick={()=>handleAcception()}>Accept</button>
    </div> 
</div>


  )
}

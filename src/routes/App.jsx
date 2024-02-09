import { useEffect, useState } from 'react' 
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
import { Link } from 'react-router-dom'

import '../css/FolderPicker.css'
function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    async function getMarker(){
      const querySnapshot = await getDocs(collection(db, "fileData"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
      });
  }
    getMarker()  
  console.log(getMarker())
  },[])
  return ( 
      <div className='FolderPickerCont'>
         <Link to={'/GS'} >
        <div className='folderCont'>
          General Science
        </div>
      </Link>

      <Link to={'/LS'} >
        <div className='folderCont'>
          Life Science
        </div>
      </Link>

      <Link to={'/ES'} >
        <div className='folderCont'>
          Economy Sociology
        </div>
      </Link>

      <Link to={'/LH'} >
        <div className='folderCont'>
        Literature Humanities
        </div>
      </Link>
      </div> 
  )
}

export default App

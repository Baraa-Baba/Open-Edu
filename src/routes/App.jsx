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
          GS
        </div>
      </Link>

      <Link to={'/LS'} >
        <div className='folderCont'>
          LS
        </div>
      </Link>

      <Link to={'/ES'} >
        <div className='folderCont'>
          ES
        </div>
      </Link>

      <Link to={'/LH'} >
        <div className='folderCont'>
          LH
        </div>
      </Link>
          <style jsx>{`
            footer{
              position:fixed;
              width:100%;
              bottom:0
            }
          `}</style>
      </div> 
  )
}

export default App

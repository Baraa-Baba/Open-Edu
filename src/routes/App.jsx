import { useEffect, useState } from 'react' 
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
import { Link } from 'react-router-dom'
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
      <div>
          <Link to={'/GS'}>GS</Link>
          <Link to={'/LS'}>LS</Link>
          <Link to={'/ES'}>ES</Link>
          <Link to={'/LH'}>LH</Link>
      </div> 
  )
}

export default App

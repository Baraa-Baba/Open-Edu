import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";  

import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase'; 
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [IsAlreadySetUp,setIsAlreadySetUp]=useState(false)
  const [AccFiles,setAccFiles]=useState([])


  async function getMarker(){
    let AceppetedFiles=[]
    console.log('yolo main')
    let allFiles= []
    const querySnapshot = await getDocs(collection(db, "AllfileData"));
    querySnapshot.forEach((doc) => { 
      if(doc.data()){
        allFiles=doc.data()?.files
      }
      
  });
  console.log(allFiles)
  AceppetedFiles =allFiles.filter((file)=>file?.STATUS=='ACCEPTED')
  console.log(AceppetedFiles)
  setAccFiles(AceppetedFiles)
  }    
  useEffect(()=>{
    getMarker()
  },[])

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    if(!IsAlreadySetUp){
    setIsAlreadySetUp(true)
    console.log('seted')
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        'size': 'invisible',
      }
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        AccFiles
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
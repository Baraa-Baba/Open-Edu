import React from "react";  
import ReactDOM from "react-dom/client"; 
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"; 
import Navbar from './components/Navbar' 
import { UserAuthContextProvider } from "./context/AuthContext";  
import AboutUs from "./routes/AboutUs";
import Footer from "./components/Footer";  
import Form from "./routes/Form";
import App from "./routes/App"; 
import AdminSignIn from "./routes/AdminSignIn";
import ErrorPage from './routes/ErrorPage'
import Admin from "./routes/Admin";
import FolderPicker from "./components/FolderPicker";
import { GSSubjectOptions,LSSubjectOptions,LHSubjectOptions,ESSubjectOptions,typeApplcation } from './Subjects/subjects';
import FilePicker from "./components/FilePicker"; 
import './index.css'
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from './firebase'; 
import Protected from "./components/Protacted";
let AceppetedFiles=[]
async function getMarker(){
  const querySnapshot = await getDocs(collection(db, "fileData"));
  querySnapshot.forEach((doc) => { 
    if(doc.data()&&doc.data().STATUS === 'ACCEPTED'){
        AceppetedFiles.push(doc.data()) 
    }
    
});
}
getMarker()   
console.log(AceppetedFiles)
function genrateSecsRoutes(secsSubject,sec){
  return secsSubject.map((subject)=>{
    console.log(subject)
    if(subject?.units){
    return { 
       path: `/${sec}/${subject.name}`,
       element: <FolderPicker subjects={subject.units} /> ,
     }
    }else{
      return { 
         path: `/${sec}/${subject.name}`,
         element: <FolderPicker subjects={Object.values(typeApplcation).map(obj => obj.name)} /> ,
       }
    }
   })
}

const generateUnitRoute = (secsSubject,sec) => {
  console.log(sec)
  console.log(secsSubject)
  return secsSubject.flatMap((subject) => {
    return (
      subject?.units?.map((unit) => {  
        if(unit?.lessons){
        return {
          path: `/${sec}/${subject.name}/${unit.name}`,
          element: <FolderPicker subjects={unit?.lessons} />,
          
        }; 
      }else{
        return {
          path: `/${sec}/${subject.name}/${unit.name}`,
          element: <FolderPicker subjects={Object.values(typeApplcation).map(obj => obj.name)} />,
          
        }; 
      }
      }) || []
    );
  });
};
const genrateLessonRoute = (secsOptions,sec) => {
  let lessonsRoutes=[]
  secsOptions.flatMap((subject) => {
    return (
      subject?.units?.map((unit) => { 
        if(unit?.lessons){
        unit?.lessons?.map((lesson)=>{   
          lessonsRoutes.push( { 
              path: `/${sec}/${subject.name}/${unit.name}/${lesson}`,
              element: <FolderPicker subjects={Object.values(typeApplcation)?.map(obj => obj.name)} />
            })
        })
        }
      })
    
    );
  });
  return lessonsRoutes
};
const genrateTypesRoute = (secSubject,sec) => {
  let typeRoutes=[]
  secSubject.flatMap((subject) => {
    if(subject?.units){
    return (
      subject?.units?.map((unit) => { 
        if(unit?.lessons){
        unit?.lessons.map((lesson)=>{  
          for(let i=0;i<typeApplcation.length;i++){
            typeRoutes.push({
              path: `/${sec}/${subject.name}/${unit.name}/${lesson}/${typeApplcation[i].name}`,
              element:<FilePicker accFiles={AceppetedFiles} />,
            })
          }
        })
      }else{ 
          for(let i=0;i<typeApplcation.length;i++){
            typeRoutes.push({
              path: `/${sec}/${subject.name}/${unit.name}/${typeApplcation[i].name}`,
              element:<FilePicker accFiles={AceppetedFiles} />,
            })
          } 
      }
      })
    )}
    else{
      for(let i=0;i<typeApplcation.length;i++){
        typeRoutes.push({
          path: `/${sec}/${subject.name}/${typeApplcation[i].name}`,
          element:<FilePicker accFiles={AceppetedFiles} />,
        })
      }  
    }
    
  
}
  );
  return typeRoutes
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement:<ErrorPage />,
  },
  {
    path: "about-us/",
    element: <AboutUs /> ,
  }, 
  {
    path: "/form",
    element: <Form /> ,
  }, 
  {
    path: "/AdminSignIn",
    element: <AdminSignIn /> ,
  }, 
  {
    path: "/Admin",
    element:
    <Protected>
       <Admin />
    </Protected>
     ,
  }, 
  {
    path: "/ES",
    element: <FolderPicker subjects={ESSubjectOptions} /> ,
  }, 
 
  {
    path: "/LS",
    element: <FolderPicker subjects={LSSubjectOptions} /> ,
  }, 
  {
    path: "/LH",
    element: <FolderPicker subjects={LHSubjectOptions} /> ,
  }, 
  {
    path: "/GS",
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  },  

   ...genrateSecsRoutes(LSSubjectOptions,'LS'),
   ...genrateSecsRoutes(ESSubjectOptions,'ES'),
   ...genrateSecsRoutes(GSSubjectOptions,'GS'),
   ...genrateSecsRoutes(LHSubjectOptions,'LH'),
   ...generateUnitRoute(LSSubjectOptions,'LS'),
   ...generateUnitRoute(ESSubjectOptions,'ES'),
   ...generateUnitRoute(GSSubjectOptions,'GS'),
   ...generateUnitRoute(LHSubjectOptions,'LH'),  
  ...genrateLessonRoute(ESSubjectOptions,'ES'),
  ...genrateLessonRoute(LSSubjectOptions,'LS'),
  ...genrateLessonRoute(LHSubjectOptions,'LH'),
  ...genrateLessonRoute(GSSubjectOptions,'GS'),
  ...genrateTypesRoute(ESSubjectOptions,'ES'),
  ...genrateTypesRoute(LSSubjectOptions,'LS'),
  ...genrateTypesRoute(LHSubjectOptions,'LH'),
  ...genrateTypesRoute(GSSubjectOptions,'GS'),

  {
    path: "/GS",
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  },  
{
  path:'/*',
  element: <div>reRoute</div> , 
}
]);  
console.log(GSSubjectOptions)
ReactDOM.createRoot(document.getElementById("root")).render( 
    <UserAuthContextProvider>  
      <Navbar />
    <RouterProvider router={router} /> 
    <Footer  /> 
    </UserAuthContextProvider> 
);
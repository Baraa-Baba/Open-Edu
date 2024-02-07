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


const generateUnitRoute = () => {
  return GSSubjectOptions.flatMap((subject) => {
    return (
      subject?.units?.map((unit) => { 
        return {
          path: `/GS/${subject.name}/${unit.name}`,
          element: <FolderPicker subjects={unit?.lessons} />,
          
        };
      }) || []
    );
  });
};
const genrateLessonRoute = () => {
  let lessonsRoutes=[]
   GSSubjectOptions.flatMap((subject) => {
    return (
      subject?.units?.map((unit) => { 
        unit?.lessons.map((lesson)=>{   
          lessonsRoutes.push( { 
              path: `/GS/${subject.name}/${unit.name}/${lesson}`,
              element: <FolderPicker subjects={Object.values(typeApplcation).map(obj => obj.name)} />
            })
        })
      })
    
    );
  });
  return lessonsRoutes
};
const genrateTypesRoute = () => {
  let typeRoutes=[]
  GSSubjectOptions.flatMap((subject) => {
    return (
      subject?.units?.map((unit) => { 
        unit?.lessons.map((lesson)=>{ 
          for(let i=0;i<typeApplcation.length;i++){
            typeRoutes.push({
              path: `/GS/${subject.name}/${unit.name}/${lesson}/${typeApplcation[i].name}`,
              element:<FilePicker accFiles={AceppetedFiles} />,
            })
          }
        })
      }) || []
    );
  });
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
    path: "/Form",
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
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  }, 
 
  {
    path: "/LS",
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  }, 
  {
    path: "/LH",
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  }, 
  {
    path: "/GS",
    element: <FolderPicker subjects={GSSubjectOptions} /> ,
  }, 
  ...GSSubjectOptions.map((subjects)=>{
   return {
      path: `/GS/${subjects.name}`,
      element: <FolderPicker subjects={subjects.units} /> ,
    }
  }), 
  ...generateUnitRoute(),
  ...genrateLessonRoute(),
  ...genrateTypesRoute()
]);  
console.log(GSSubjectOptions)
ReactDOM.createRoot(document.getElementById("root")).render( 
    <UserAuthContextProvider>  
      <Navbar />
    <RouterProvider router={router} /> 
    <Footer  /> 
    </UserAuthContextProvider> 
);
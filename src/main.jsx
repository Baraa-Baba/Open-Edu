import React from "react";  
import ReactDOM from "react-dom/client"; 
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"; 
import Navbar from './components/Navbar' 
import Footer from "./components/Footer";  
import { UserAuthContextProvider } from "./context/AuthContext";  
import AboutUs from "./routes/AboutUs";
import Form from "./routes/Form";
import App from "./routes/App"; 
import AdminSignIn from "./routes/AdminSignIn";
import ErrorPage from './routes/ErrorPage'
import Admin from "./routes/Admin";
import FolderPicker from "./components/FolderPicker";
import { GSSubjectOptions,LSSubjectOptions,LHSubjectOptions,ESSubjectOptions, SATSubjectOptions, typeApplcation } from './Subjects/subjects';
import FilePicker from "./components/FilePicker"; 
import './index.css'
import {collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from './firebase'; 
import Protected from "./components/Protacted"; 
let AceppetedFiles=[]
function genrateSecsRoutes(secsSubject,sec){
  return secsSubject.map((subject)=>{
    if(subject?.units){
    return { 
       path: `/${sec}/${subject.name}`,
       element: <FolderPicker subjects={[...subject.units,{name:'exams',type:'exams'},{name:'books',type:'books'}]} /> ,
     }
    }else{
      return { 
         path: `/${sec}/${subject.name}`,
         element: <FolderPicker subjects={[...Object.values(typeApplcation).map(obj => obj.name),{name:'books',type:'books'} ]} /> ,
       }
    }
   })
}

let generateUnitRoute = (secsSubject,sec) => {
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
let genrateNonTypeRoutes = (secsSubject,sec,name) => {
  return secsSubject.map((subject) => {
    return {
      path: `/${sec}/${subject.name}/${name}`,
      element: <FilePicker isExam={true} accFiles={AceppetedFiles} />, 
    }; 
  });
}
let genrateLessonRoute = (secsOptions,sec) => {
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
let genrateTypesRoute = (secSubject,sec,accFiles) => {
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
  {
    path: "/SAT",
    element: <FolderPicker subjects={SATSubjectOptions} /> ,
  },  
...genrateNonTypeRoutes(LSSubjectOptions,'LS','exams'),
...genrateNonTypeRoutes(ESSubjectOptions,'ES','exams'),
...genrateNonTypeRoutes(GSSubjectOptions,'GS','exams'),
...genrateNonTypeRoutes(LHSubjectOptions,'LH','exams'),
...genrateNonTypeRoutes(LSSubjectOptions,'LS','books'),
...genrateNonTypeRoutes(ESSubjectOptions,'ES','books'),
...genrateNonTypeRoutes(GSSubjectOptions,'GS','books'),
...genrateNonTypeRoutes(LHSubjectOptions,'LH','books'),
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
  ...genrateNonTypeRoutes(SATSubjectOptions, 'SAT', 'exams'),
  ...genrateNonTypeRoutes(SATSubjectOptions, 'SAT', 'books'),
  ...genrateSecsRoutes(SATSubjectOptions, 'SAT'),
  ...generateUnitRoute(SATSubjectOptions, 'SAT'),
  ...genrateLessonRoute(SATSubjectOptions, 'SAT'),
  ...genrateTypesRoute(SATSubjectOptions, 'SAT', AceppetedFiles),

{
  path:'/*',
  element: <div>reRoute</div> , 
}
]);  
ReactDOM.createRoot(document.getElementById("root")).render( 
    <UserAuthContextProvider>    
        <RouterProvider router={router} />   
    </UserAuthContextProvider> 
);
  
import React from "react"; 
import ErrorPage from "./routes/ErrorPage";
import ReactDOM from "react-dom/client";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"; 
import Navbar from './components/Navbar' 
import { UserAuthContextProvider } from "./context/AuthContext"; 
import AboutUs from "./routes/AboutUs";
import Footer from "./components/Footer";  
import App from "./routes/App"; 
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
]); 
ReactDOM.createRoot(document.getElementById("root")).render( 
    <UserAuthContextProvider>  
      <Navbar />
    <RouterProvider router={router} /> 
    <Footer  /> 
    </UserAuthContextProvider> 
);
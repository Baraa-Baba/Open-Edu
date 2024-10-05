import React from 'react'
import FolderCard from './FolderCard'
import '../css/FolderPicker.css'
import Navbar from '../components/Navbar' 
import Footer from "../components/Footer";  
export default function FolderPicker({subjects}) {
  console.log(subjects)
  return (
    <>
    <Navbar />
    <div className='FolderPickerCont'> 
         {subjects[0] ? subjects?.map(function (subject){
       return  <FolderCard subject={subject} /> 
}) :
<div>there are no files avialble <a href="/form"><button>Contribute</button></a>  </div>
 }

    </div>
    <Footer />
    </>
  )
}

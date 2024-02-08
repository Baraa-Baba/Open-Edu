import React from 'react'
import FolderCard from './FolderCard'
import '../css/FolderPicker.css'
export default function FolderPicker({subjects}) {
  console.log(subjects)
  return (
    <div className='FolderPickerCont'> 
         {subjects[0] ? subjects?.map(function (subject){
       return  <FolderCard subject={subject} /> 
}) :
<div>there are no files avialble <a href="/form"><button>Contribute</button></a>  </div>
 }

    </div>
  )
}

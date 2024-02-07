import React from 'react'
import FolderCard from './FolderCard'
import '../css/FolderPicker.css'
export default function FolderPicker({subjects}) {
  return (
    <div className='FolderPickerCont'> 
         {subjects.map(function (subject){
       return  <FolderCard subject={subject} /> 
})}

    </div>
  )
}

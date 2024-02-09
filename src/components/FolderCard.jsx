import React from 'react'
import { Link } from 'react-router-dom'
import '../css/FolderPicker.css'

export default function FolderCard({subject}) {
    let subjectName=subject.name?subject.name:subject
  return (
    <>
      <Link to={`/form`}>
        
    <div className='folderCont'>
         {subjectName}
         
    </div>
        </Link> 
      </>
  )
}

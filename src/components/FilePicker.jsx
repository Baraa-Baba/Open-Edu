import React, { useState } from 'react'
import AccCard from './AccCard'
import '../css/FilePicker.css'
export default function FilePicker({accFiles}) {
    const [acceptedFiles,setaccFiles]=useState(accFiles)
    console.log(accFiles)
    const acceptedFilesFiltred =acceptedFiles.filter
  return (
    <div className='filesCont'>
         {acceptedFiles.map(function (accFile, index){
       return  <AccCard fileData={accFile} /> 
})}

    </div>
  )
}

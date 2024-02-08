import React, { useEffect } from 'react'
import '../css/Popup.css'
export default function Popup({isFileUploaded,fileLength}) {
    useEffect(()=>{
        alert(fileLength)
        alert(isFileUploaded)
    },[fileLength,isFileUploaded])
  return (
    <div className='PopupCont'> 
        {isFileUploaded>= fileLength ?
         <div>
            isFileUploaded
        </div>:
         <div> 
            uploadingFile....
            </div>
        
        }
    </div>
  )
}

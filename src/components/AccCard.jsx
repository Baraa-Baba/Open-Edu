import React from 'react'

export default function AccCard({fileData}) {
  return (
<div class="fileContainer fileContainerAcc">
    <iframe src={fileData.fileURL} frameborder="0"></iframe>
    <p class="fileInfo">
        File Name: <span className='fileDataSpan'>{fileData.fileName}</span> <br /> 
        Author's Name: <span className='fileDataSpan'>{fileData.authorsName}</span> <br /> 
    </p>
    <p class="tagInfo">Secs: <span className='fileDataSpan'>{fileData.folderTags?.secs.join(', ')}</span></p>
    <p class="tagInfo">Subject: <span className='fileDataSpan'>{fileData.folderTags?.subject}</span></p>
    <p class="tagInfo">Units: <span className='fileDataSpan'>{fileData.folderTags?.units.join(', ')}</span></p>
    <p class="tagInfo">Lessons: <span className='fileDataSpan'>{fileData.folderTags?.lessons?.join(', ')}</span></p>
    <a class="fileLink" target="_blank" href={fileData?.fileURL}>View File</a> 
</div>
  )
}

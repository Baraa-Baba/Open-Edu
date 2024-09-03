import React from 'react'
export default function AccCard({fileData}) {
  function onDocumentLoadSuccess(){
    alert('chipachp')
  }
  const generateRandomBlue = () => {
    const randomShade = Math.floor(Math.random() * (255 - 100 + 1) );
    return `rgb(0, 0, ${randomShade})`;
  };

  const primaryColors = ['#FF5733', '#33FF57', '#5733FF', '#FF3333', '#33FFEC', '#FFD700'];

  // Function to pick a random color from the array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * primaryColors.length);
    return primaryColors[randomIndex];
  };
  return (
<div class="fileContainer fileContainerAcc bgBlue">  
<iframe className='fileIframe' src={fileData?.fileURL} type="application/pdf" frameborder="0">
</iframe>
    <p class="fileInfo">
      <div class = "namecont"> 
        <p><span class = "tohide">File Name:</span> <span className='fileDataSpan inline names'>{fileData.fileName.replace(".pdf", "")}</span></p>
      </div>
       Author's Name: <span className='fileDataSpan inline'>{fileData.authorsName}</span> <br /> 
    </p>
    <p class="tagInfo"> <span className='fileDataSpan'> <span className="white">Sections: </span> {fileData.folderTags?.secs.join(', ')}</span></p>
    <p class="tagInfo"> <span className='fileDataSpan'><span className="white">Subject: </span>  {fileData.folderTags?.subject}</span></p>
    <p class="tagInfo"> <span className='fileDataSpan'><span className="white">Units: </span>  {fileData.folderTags?.units.join(', ')}</span></p>
    <p class="tagInfo"> <span className='fileDataSpan'><span className="white">lessons: </span>  {fileData.folderTags?.lessons?.join(', ')}</span></p>
    <a class="fileLink" target="_blank" href={fileData?.fileURL}>
     <button className="FileButton">
     View File
      </button> 
       </a> 
 
    
</div>
  )
}

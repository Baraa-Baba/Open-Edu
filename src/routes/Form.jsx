import React, { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, setDoc,doc , getDocs,getDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { ref, getDownloadURL,getStorage,uploadString, uploadBytesResumable } from "firebase/storage"; 
import { storage } from '../firebase';  
import '../css/form.css'
import { GSSubjectOptions,LSSubjectOptions,LHSubjectOptions,ESSubjectOptions,typeApplcation } from '../Subjects/subjects';
import RequiredWarning from '../components/RequiredWarning';
import Popup from '../components/Popup';
export default function Form() {

  let secsOptions = [{name: 'GS'},{name: 'LS'},{name: 'ES'},{name: 'LH'}]
    
  


  const [slectedSecsOptions,setslectedSecsOptions]=useState('')
  const [selectedSubject,setselectedSubject]=useState('')
  const [authorsName,setAuthorsName]=useState('')
  const [fileData,setfileData] =useState({}) 
  const [isShowReqried,setisShowReqried]=useState(false)
  const [AvliableLessons,setAvliableLessons]=useState([])
  const [SlectedUnits,setSlectedUnits]=useState([])
  const [SelectedLessons,setSelectedLessons]=useState([])
  const [ApplicationTypes,setApplicationTypes] =useState([])
  const [AvialbleSubjects,setAvialbleSubjects]=useState([])
  const [MatchingSections,setMatchingSections] =useState([])
  const [isClickedOnSubmit,setisClickedOnSubmit]=useState(false) 
  const [AvialibleUntis,setAvialibleUntis]=useState([])
  const [AvialibleUntisAll,setAvialibleUntisAll]=useState([])
  const [IsUnitFuffled,setIsUnitFuffled]=useState(false)
  const [IsLessonFuffiled,setIsLessonFuffiled]=useState(false)
  const [Files,setFiles]=useState([])
  const [IsSubmited,setIsSubmited]=useState(false)
  const [isFileUploaded,setisFileUploaded]=useState(0)
  const [fileLength,setFileLength]=useState(0)
  function handleApplicationTypes(value){  
    setTimeout(()=>{
      alert(value[0]?.name)
      setApplicationTypes(value)
    },1000)
  }
  useEffect(()=>{
    alert('cmon craclin')
console.log(ApplicationTypes)
  },[ApplicationTypes])
  function handleSecChange(selectedSecs){  
    handleSubjectChange(selectedSubject) 
  const allSections = [{name:'GS',subjects:GSSubjectOptions},{name:'ES',subjects:ESSubjectOptions},{name:'LS',subjects:LSSubjectOptions},{name:'LH',subjects:LHSubjectOptions}]
    let secsArray = Object.values(selectedSecs).map(obj => obj.name) 
    let matchingSections = allSections.filter(subject => secsArray.includes(subject.name)); 
    let avialbleSubjects= new Set();

    matchingSections.forEach((sections)=>{ 
      sections?.subjects?.forEach((subject)=>{
        avialbleSubjects.add(subject?.name)
      })
    }) 
    let arravialbleSubjects=Array.from(avialbleSubjects)  
    setAvialbleSubjects(convertToOptions(arravialbleSubjects))
    setMatchingSections(matchingSections)  
    setslectedSecsOptions(selectedSecs)
  }
  function handleSubjectChange(slectedSubject){ 
    setselectedSubject(slectedSubject) 
    let avialibleUntis = new Set() 
    let avialbleSubjectsAll= [];

    MatchingSections.forEach((section)=>{
      section?.subjects?.forEach((subject)=>{  
        if(subject?.name.toLowerCase()===slectedSubject?.name?.toLowerCase()){  
          subject?.units?.forEach((unit)=>{  
            avialbleSubjectsAll.push(unit)
            avialibleUntis.add(unit?.name)
          })
        }
      })
    }) 
    setAvialibleUntisAll(avialbleSubjectsAll)
    setAvialibleUntis(convertToOptions(Array.from(avialibleUntis))) 
  }
  useEffect(()=>{
    let isUnitFuffled
    if(!AvialibleUntis[0]?.name){
      isUnitFuffled=true//there is nothing to fill
    }else if(SlectedUnits[0]?.name){
      isUnitFuffled=true 
    }else{
      isUnitFuffled=false 
    }
    let isLessonFuffled
    if(!AvliableLessons[0]?.name){
      isLessonFuffled=true//there is nothing to fill
    }else if(SelectedLessons[0]?.name){
      isLessonFuffled=true 
    }else{
      isLessonFuffled=false 
    }
    setIsUnitFuffled(isUnitFuffled)
    setIsLessonFuffiled(isLessonFuffled)
    
  },[SlectedUnits,SelectedLessons])

  function handleFormSubmmsion(){ 
    let isUnitFuffled
    if(!AvialibleUntis[0]?.name){
      isUnitFuffled=true//there is nothing to fill
    }else if(SlectedUnits[0]?.name){
      isUnitFuffled=true 
    }else{
      isUnitFuffled=false 
    }
    let isLessonFuffled
    if(!AvliableLessons[0]?.name){
      isLessonFuffled=true//there is nothing to fill
    }else if(SelectedLessons[0]?.name){
      isLessonFuffled=true 
    }else{
      isLessonFuffled=false 
    }
    setIsUnitFuffled(isUnitFuffled)
    setIsLessonFuffiled(isLessonFuffled)
    if(!document.getElementById('permissionCheck').checked){
      setisShowReqried(true)
    }
    if(!document.getElementById('permissionCheck').checked||!authorsName||!selectedSubject?.name||!slectedSecsOptions[0]?.name||
     !isUnitFuffled ||!isLessonFuffled||!ApplicationTypes[0]?.name) { 
      setisClickedOnSubmit(true) 
      console.log(!authorsName.trim(),ApplicationTypes[0]?.name) 
      return
      }
    let formFileElment= document.getElementById('form_file')
    let uniqueId = uuidv4();  
    let singleFileData ={ 
      fileID:uniqueId,
      STATUS:'PENDING', 
      fileName:document.getElementById('fileName').value?document.getElementById('fileName').value: formFileElment?.files[0]?.name,
      authorsName:document.getElementById('authorsName').value, 
      folderTags:{secs:Object.values(slectedSecsOptions).map(obj => obj.name),subject:selectedSubject.name,
         units: Object.values(SlectedUnits).map(obj => obj.name),lessons:Object.values(SelectedLessons).map(obj => obj.name) ,
          ApplicationTypes:Object.values(ApplicationTypes).map(obj => obj.name) 
        },
      extraTags:{}
    }
    setFileLength(formFileElment.files.length)
    if(formFileElment.files.length==1){  

    uploadFile(formFileElment.files[0],singleFileData.fileID,singleFileData) 
    }else{
      for(let i=0;i<formFileElment.files.length;i++){ 
        let otherUniqueID = uuidv4();  
        let mutliFileData=singleFileData
        mutliFileData.fileID=otherUniqueID 
        mutliFileData.fileName= formFileElment.files[i].name  
        uploadFile(formFileElment.files[i],otherUniqueID,mutliFileData,formFileElment.files[i].name ) 
      }
  } 
}
  async function handleSingleFileUpload(fileData,fileURL){ 
    try {   
      let fileDataTMP =fileData
      fileDataTMP.fileURL=fileURL 
      const docRef = await setDoc(doc(db, "fileData",fileDataTMP.fileID), 
      fileDataTMP
      );     
      setisFileUploaded((prev)=>prev+1)
    } catch (e) {  
      console.error("Error adding document: ", e); 
    }
  } 
  function convertToOptions(theTHing) { 
    if(theTHing){
  return theTHing.map(subject => ({ name: subject.toLowerCase() }));
    }else{
      return []
    }
} 
const uploadFile = (file,fileID,singleFileData,fileName) => { 
  if (!file) return;  
  setIsSubmited(true)
  const sotrageRef = ref(storage, `files/${fileID}/${singleFileData?.fileName}`);
  const uploadTask = uploadBytesResumable(sotrageRef, file); 
   uploadTask.on(
     "state_changed",
     (snapshot) => {
       const prog = Math.round(
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       );
      },
     (error) => console.log(error),
     () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         console.log("File available at", downloadURL); 
          let singleFileDataTmp = singleFileData
          singleFileDataTmp.fileID = fileID
          singleFileDataTmp.fileName = fileName
         handleSingleFileUpload(singleFileDataTmp,downloadURL) 
       }); 
     }
   );
};
    function handleFileInputChange(elment){  
            setFiles(elment.files)
            const filesNames = elment.parentElement.querySelector("#files-names");
            filesNames.innerHTML=''  
            for (let i = 0; i < elment.files.length; i++) {
                            let fileBloc = document.createElement("div");
                            fileBloc.classList.add("file-block");

                            let fileName = document.createElement("div");
                            fileName.classList.add("name");
                            fileName.textContent = elment.files[i].name;

                            let fileDeleteSpan = document.createElement("div");
                            fileDeleteSpan.classList.add("file-delete");
                            fileDeleteSpan.addEventListener('click',()=>{ 
                                removeFileFromFileList(i,elment)
                                handleFileInputChange(elment)
                            })
                            fileDeleteSpan.innerHTML = '<div>x</div>';

                            fileBloc.appendChild(fileDeleteSpan);
                            fileBloc.appendChild(fileName);

                            filesNames.appendChild(fileBloc);
                 }  
            
                 const filesNamesHeight = filesNames.offsetHeight+100; 
                if(filesNamesHeight>150){
            elment.style.height = filesNamesHeight + "px";
                }

        }
    function removeFileFromFileList(index,input) {
    const dt = new DataTransfer() 
    const { files } = input
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (index !== i)
        dt.items.add(file)  
    }
    
    input.files = dt.files  
    }   
    function handleUnitChange(selectedUnits){
      setSlectedUnits(selectedUnits) 
      let selectedUnitsData= []
      AvialibleUntisAll.forEach((AvialbleUnit)=>{
        let isFound=false
        selectedUnits.forEach((selectedUnit)=>{ 
          if(selectedUnit?.name?.toLowerCase()==AvialbleUnit?.name?.toLowerCase()){  
            selectedUnitsData.push(AvialbleUnit)
          }
        }) 
      })
      let lessons=new Set()
      selectedUnitsData.forEach((selectedData)=>{
        selectedData?.lessons?.forEach((lesson)=>{
          lessons.add(lesson)
        })
      })
      console.log(selectedUnitsData)
      setAvliableLessons(convertToOptions(Array.from(lessons))) 
    }   
    return (

    <div className='formCont'> 
    <p className='formSubTitle'>basic info</p>

 
    <label htmlFor='authorsName'  className='formLabel'>Author's Name* {isClickedOnSubmit && <RequiredWarning requiredValue={authorsName} />}  </label>
    <input type="text" onInput={(e)=>setAuthorsName(e.target.value)} placeholder="Author's Name" className='formInput' id='authorsName' />

    <label htmlFor='fileName' className='formLabel'>File Name</label>
    <input type="text" placeholder="File Name" className='formInput' id='fileName' />

    <div className='checkCont'>
        <p className='permissionText'>I have permission from the author/s</p>
        <input onChange={(e)=>e.target.value && setisShowReqried(false)} type="checkbox" name="" required id="permissionCheck" />  {isShowReqried && <span className='warningText'>you have to have permission from the author</span>}
    </div>

    <p className='formSubTitle'>file tags</p>

    <label htmlFor='sections' className='formLabel'>Sections* {isClickedOnSubmit && 
      <span style={{color:'red'}}> 
      {(!slectedSecsOptions[0]?.name)?'(this field is required)':null}
  </span>
    }  </label>
    <Multiselect showArrow className='mutilSelect' avoidHighlightFirstOption onRemove={(value) => handleSecChange(value)}  onSelect={(value) => handleSecChange(value)} options={secsOptions} placeholder='Sections' displayValue="name" showCheckbox={true} />

    <label htmlFor='subjects' className='formLabel'>Subjects* {isClickedOnSubmit &&
      <span style={{color:'red'}}> 
      {(!selectedSubject)?'(this field is required)':null}
  </span>
    }</label>
    <Multiselect singleSelect className='mutilSelect singleSelect' avoidHighlightFirstOption  id='subjectMutli'
     options={AvialbleSubjects} onSelect={(value) => handleSubjectChange(value[0])} onRemove={(value) => handleSubjectChange(value[0])}
        placeholder='Subjects' displayValue="name" closeOnSelect />
{ !selectedSubject ||  AvialibleUntis[0]?.name  ? <>
    <label htmlFor='units' className='formLabel'>Units* 
    {isClickedOnSubmit &&
      <span style={{color:'red'}}> 
      {(!IsUnitFuffled)?'(this field is required)':null}
  </span>
    }
    
      </label>
   <Multiselect showArrow className='mutilSelect' avoidHighlightFirstOption options={AvialibleUntis} onRemove={(value) => handleUnitChange(value)}
     onSelect={(value) => handleUnitChange(value)} placeholder='Units' displayValue="name" showCheckbox={true} />
     </>
     :null}

   {  !selectedSubject ||  AvialibleUntis[0]?.name && (!SlectedUnits[0]?.name || (AvliableLessons[0]?.name) )?
   <>
   <label htmlFor='lessons' className='formLabel'>Lessons* 
   {isClickedOnSubmit &&
      <span style={{color:'red'}}> 
      {(!IsLessonFuffiled)?'(this field is required)':null}
  </span>
    }
   </label>
    <Multiselect showArrow onRemove={(value) => setSelectedLessons(value)}  onSelect={(value) => setSelectedLessons(value)}
     className='mutilSelect' avoidHighlightFirstOption options={AvliableLessons} placeholder='Lessons' displayValue="name" showCheckbox={true} />
     </>
     :null
}
    <label htmlFor='types' className='formLabel'>Types*
    {isClickedOnSubmit &&
      <span style={{color:'red'}}> 
      {(!ApplicationTypes[0]?.name)?'(this field is required)':null}
  </span>
    }
    </label>
    <Multiselect showArrow onRemove={(value) => handleApplicationTypes(value)}  onSelect={(value) => handleApplicationTypes(value)}
     className='mutilSelect' avoidHighlightFirstOption options={typeApplcation}  placeholder='Types' displayValue="name" showCheckbox={true} />

    <p className='formSubTitle'>attach file*
    {isClickedOnSubmit &&
      <span style={{color:'red'}}> 
      {(!Files.length)?'(this field is required)':null}
  </span>
    }
    </p>


    <div className="">
        <div className="form-floating  mb-4">
            <input accept='.pdf' type="file" onChange={(e) => handleFileInputChange(e.target)} id="form_file" multiple="multiple" name="file[]" className="form-control  upload-empty" placeholder="Attach File" required="" data-gtm-form-interact-field-id="0" />
            <div id="files-names" className="upload-emptynames"></div> 
        </div>
        <div className='permisiionRequest'>
        </div>
    </div>
{IsSubmited && <Popup isFileUploaded={isFileUploaded} fileLength={fileLength} />}
{!IsSubmited &&    <button className='submitButton' onClick={() => handleFormSubmmsion()}>Submit</button>
}</div>

  )
}

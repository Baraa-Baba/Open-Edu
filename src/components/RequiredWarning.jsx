import React from 'react'

export default function RequiredWarning({requiredValue}) {
  console.log(requiredValue)
  return (
    <span style={{color:'red'}}> 
        {(!requiredValue)?'(this field is required)':null}
    </span>
  )
}

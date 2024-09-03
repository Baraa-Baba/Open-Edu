import React from 'react'
import '../css/NoFiles.css'
import { Link } from 'react-router-dom'
export default function NoFiles() {
  return (
<div class = "error">
    <div>
    <div class = "thanks">
            <h2> No Files!</h2> 
            <p>You can still find plenty of <Link to = "/">materials!</Link></p>
        </div>
        <div class = "othershit"> 
            <Link to = "/">
            <button>
                Learn
            </button>
                </Link>
        </div>
    </div>
    </div>
  )
}

import React from 'react'
import '../css/NoFiles.css'
import { Link } from 'react-router-dom'
export default function NoFiles() {
  return (
<div class = "error">
    <div>
    <div class = "thanks">
            <h2> No Files!</h2> 
            <p>You can fix that by <Link to = "/form">contributing!</Link></p>
        </div>
        <div class = "othershit">
            <Link to = "/form">
            <button>
                Contribute
                </button>
                </Link>
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
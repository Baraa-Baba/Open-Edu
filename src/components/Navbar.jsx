import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (  
    <header>
        <div id = "title"><h1 id = "Main-title"><Link to={`/`}>OPEN-edu</Link></h1></div>
            <ul class="navbar-list">
                <li class="navbar-item"><Link to={`/about-us`}>About</Link></li>
                <li class="navbar-item"><Link to={`/`}>Learn</Link></li>
                <li class="navbar-item"><Link to={`/form`}>Contribute</Link></li>
            </ul>
    </header> 
  )
}

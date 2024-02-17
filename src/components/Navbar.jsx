import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (  
    <header>
        <div id = "title"><h1 id = "Main-title"><Link to={`/`}>FEKRA</Link></h1></div>
            <ul class="navbar-list">
                <li class="navbar-item"><Link to={`/about-us`}>not about</Link></li>
                <li class="navbar-item"><Link to={`mailto:hcr8361@gmail.com`}>Contact</Link></li>
                <li class="navbar-item"><Link to={`/form`}>Contribute</Link></li>
            </ul>
    </header> 
  )
}

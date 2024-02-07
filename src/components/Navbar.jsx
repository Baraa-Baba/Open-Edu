import React from 'react'

export default function Navbar() {
  return (  
    <header>
        <div id = "title"><h1 id = "Main-title"><a href="/">FEKRA</a></h1></div>
            <ul class="navbar-list">
                <li class="navbar-item"><a href="./about-us">About</a></li>
                <li class="navbar-item"><a href="./contact">Contact</a></li>
                <button class="glow-btn"><a href="./form">contribute</a></button>
            </ul>
    </header> 
  )
}

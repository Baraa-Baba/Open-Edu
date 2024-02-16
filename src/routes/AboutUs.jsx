import React from 'react'  
import Navbar from '../components/Navbar' 
import Footer from "../components/Footer";  
export default function AboutUs() {
  return ( 
      
    <main>
      <Navbar />  
    <h1 class = "title">FEKRA Open Learning</h1>
    <div class = "info">
        <div class="logo">
            <img src="/logo.png" class="logo-img" />
        </div>
        <div class = "mission">
            <p class = "product-info">
                <span class="first-letter">W</span>ith our mission in mind, we are proud to launch this unique application.
                This application uniqness comes into play with its collaborative nature:
                students share teaching materials to help each other- who might not have
                access to quality teaching resources.
            </p>
        </div>
    </div>
    <div class="line-break"></div>
    <div class="container">
        <div class="container-title">
            <h2>Collaboration:</h2>
        </div>
        <div class="container-body">
            <p><span class="first-letter">A</span>t FEKRA we highly values student collaboration.
               As such, this application is based on collaboration.
               Students can share teaching materials using the <a href="/form">contribute</a> button.
            </p>
        </div>
    </div>
    <div class="container">
        <div class="container-title">
            <h2>Quality Education</h2>
        </div>
        <div class="container-body">
            <p> <span class="first-letter">W</span>ith this application's unique collaborative aspect, 
                students are able to <a href="/">access</a> a large variety of quality 
                resources including but not limited to: Books, Worksheets, etc..
            </p>
        </div>
    </div> 
    <div class="line-break"></div>
    <h1 class = "instructions">How to use:</h1>
    <div class="container">
        <div class="container-title">
            <h2>1) Permission: </h2>
        </div>
        <div class="container-body">
            <p> <span class="first-letter">T</span>ake permission from the owner of 
                the teaching material (teacher, tutor, friend?! ).
            </p>
        </div>
    </div> 
    <div class="container">
        <div class="container-title">
            <h2>2) Fill The Form: </h2>
        </div>
        <div class="container-body">
            <p> <span class="first-letter">F</span>ill in the <a href="/form">form</a> on the contribution page
                with correct information about the material.
            </p>
        </div>
    </div>
    <div class="container">
        <div class="container-title">
            <h2>3) Wait: </h2>
        </div>
        <div class="container-body">
            <p> <span class="first-letter">W</span>ait untill our team reviews the materials 
                before uploading to the website.
            </p>
        </div>
    </div>
    <h1 class = "instructions"><em>Thank you!</em></h1>
    <Footer />
</main>
  )
}

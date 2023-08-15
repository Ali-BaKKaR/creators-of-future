import React, { useState, useEffect } from "react";
import './navbar.css'
import { Navbar } from 'react-bootstrap';


function MyNavbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 120) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })
    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }
    return (
        <header>
            <div className="top-nav">
                <div className="social-media">
                    <a href="#">
                        <img src="assets/icons/instagram.svg" />
                    </a>
                    <a href="#">
                        <img src="assets/icons/map-pin.svg" />
                    </a>

                </div>
                <div className="mail-and-phone">
                    <p>tempmail@gmail.com</p>
                    <img src="assets/icons/mail.svg" />
                    <p id="phone-number">+92 29 659 4859</p>
                    <img src="assets/icons/phone.svg" />
                </div>
            </div>
            <nav className={navbarClasses.join(" ")}>
                <div className="nav-branding">
                    <a href="#" >البرامج السياحية</a>
                    <a href="#" >التعلم بالخارج</a>

                </div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul>
                <img src="assets/images/logo.png" height={70}></img>
                <div onClick={navchange} className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    )
}

function navchange() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

export default MyNavbar
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function MyNavbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 120) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }
  return (
    <header>
      <div className="top-nav">
        <div className="social-media">
          <a href="#">
            <img alt=" " src="/assets/icons/instagram.svg" />
          </a>
          <a href="#">
            <img alt=" " src="/assets/icons/map-pin.svg" />
          </a>
        </div>
        <div className="mail-and-phone">
          <p>tempmail@gmail.com</p>
          <img alt=" " src="/assets/icons/mail.svg" />
          <p id="phone-number">+92 29 659 4859</p>
          <img alt=" " src="/assets/icons/phone.svg" />
        </div>
      </div>
      <nav className={navbarClasses.join(" ")}>
        <div className="nav-branding">
          <Link to="/">السياحة و السفر</Link>
          <Link to="/study"> التعلم بالخارج</Link>
        </div>
        <ul className="nav-menu">
          <img alt=" " src="/assets/images/logo.png" height={70}></img>
          <li className="nav-item">
            <Link onClick={navchange} to={"courses"}>
              الكورسات
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={navchange} to={"travel"}>
              الرحلات السياحية
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        <img alt=" " src="/assets/images/logo.png" height={70}></img>
        <div className="hamburger">
          <div className="hamburger-button" onClick={navchange}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

function navchange() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

export default MyNavbar;

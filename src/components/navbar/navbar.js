import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
          <a href="https://instagram.com/cof_travel/">
            <img alt=" " src="/assets/icons/instagram.svg" />
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
          <NavLink to="/">السياحة و السفر</NavLink>
          <NavLink to="/study"> التعلم بالخارج</NavLink>
        </div>
        <ul className="nav-menu">
          <div id="mobile-logo">
            <img alt=" " src="/assets/images/logo.png" height={70}></img>
          </div>
          <li className="nav-item">
            <NavLink onClick={navchange} to={"courses"}>
              الكورسات
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={navchange} to={"travel"}>
              الرحلات السياحية
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={navchange} to={"about-us"}>
              من نحن
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={navchange} to={"contact-us"}>
              تواصل معنا
            </NavLink>
          </li>
        </ul>
        <img id="logo" alt=" " src="/assets/images/logo.png" height={70}></img>
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

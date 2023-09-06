import "./App.css";
import MyNavbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Study from "./components/study/study";
import React, { useState, useEffect } from "react";
import CourseDetails from "./components/course-details/course-details";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseList from "./components/courses-list/CoursesList";
import TravelList from "./components/travel-list/travelList";
import TravelDetails from "./components/travel-details/travelDetails";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import Contact from "./components/contact/contact";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="travel" element={<TravelList />}></Route>
        <Route path="/study" element={<Study />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/courseDetails/:id" element={<CourseDetails />}></Route>
        <Route path="/travelDetails/:id" element={<TravelDetails />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/contact-us" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

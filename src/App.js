import './App.css';
import MyNavbar from './components/navbar/navbar';
import Home from './components/home/home';
import Study from './components/study/study';
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import CourseDetails from './components/course-details/course-details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseList from './components/courses-list/CoursesList';


// const supabase = createClient("https://yjljhnjrwaiudsqhhkof.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqbGpobmpyd2FpdWRzcWhoa29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3OTI2ODEsImV4cCI6MTk5MjM2ODY4MX0.6IU21J7tEnKcMf98qdOd631IjE1dKXPvFiTh4Wg3JoA");

function App() {
  // const [countries, setCountries] = useState([]);
  // useEffect(() => {
  //   getCountries();
  // }, []);
  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }
  return (<div>
    {/* <MyNavbar /> */}
    {/* <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul> */}
    {/* <CourseDetails /> */}
    <MyNavbar />
    {/* <Routes>

      <Route path="/" element={<Home />}></Route>
      <Route path="/study" element={<Study />}></Route>
    </Routes> */}
    <CourseList></CourseList>
    <CourseDetails></CourseDetails>
  </div>
  );
}

export default App;

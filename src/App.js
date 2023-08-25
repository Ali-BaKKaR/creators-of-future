import './App.css';
import MyNavbar from './components/navbar/navbar';
import Home from './components/home/home';
import Study from './components/study/study';
import React, { useState, useEffect } from "react";
import CourseDetails from './components/course-details/course-details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseList from './components/courses-list/CoursesList';



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

    <MyNavbar />
    <Routes>

      <Route path="/" element={<Home />}></Route>
      <Route path="/study" element={<Study />}></Route>
    </Routes>
   
  </div>
  );
}

export default App;

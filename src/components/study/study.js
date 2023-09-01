import "./study.css";
import { supabase } from "../../client";
import { useEffect, useState } from "react";

function Study() {
  const [courses, setCourses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    getCourses();
    getCountries();
  }, []);

  async function getCourses() {
    const { data } = await supabase
      .from("courses")
      .select("name,image_link,country,city,hours,description")
      .eq("study_intro", true);
    setCourses(data);
  }

  async function getCountries() {
    const { data } = await supabase.from("courses").select("country");
    setCountries(data);
  }

  async function getCities(country) {
    const { data } = await supabase
      .from("courses")
      .select("city")
      .eq("country", country);
    setCities(data);
  }

  async function getWeeks(country, city) {
    const { data } = await supabase
      .from("courses")
      .select("weeks")
      .eq("country", country)
      .eq("city", city);
    setWeeks(data);
  }

  function handleCountryChange(event) {
    getCities(event.target.value);
    let handler = document.getElementById("select-city");
    handler.value = "";
    handler = document.getElementById("select-weeks");
    handler.value = "";
    if (document.getElementById("please-select-country") != null)
      document.getElementById("please-select-country").remove();
  }

  function handleCityChange(event) {
    console.log("change");
    getWeeks(
      document.getElementById("select-country").value,
      event.target.value
    );
    let handler = document.getElementById("select-weeks");
    handler.value = "";
    if (document.getElementById("please-select-city") != null)
      document.getElementById("please-select-city").remove();
  }

  return (
    <div>
      <div className="main study-background">
        <div className="welcome-title ">
          <h3>نوفر لك</h3>
          <h1>تدريب في ارقى المعاهد المعتمدة</h1>
        </div>
      </div>
      <div className="search-course">
        <form>
          <select id="select-country" onChange={handleCountryChange}>
            <option value="" disabled selected hidden>
              الدولة
            </option>
            {countries
              .map((e) => e.country)
              .filter((value, index, self) => self.indexOf(value) === index) // getting only uniqe values
              .map((e) => (
                <option value={e}> {e}</option>
              ))}
          </select>
          <select id="select-city" onChange={handleCityChange}>
            <option value="" selected hidden>
              المدينة
            </option>
            <option disabled id="please-select-country">
              يرجى اختيار الدولة اولا
            </option>

            {cities
              .map((e) => e.city)
              .filter((value, index, self) => self.indexOf(value) === index) // getting only uniqe values
              .map((e) => (
                <option value={e}> {e}</option>
              ))}
          </select>
          <select id="select-weeks">
            <option id="please-select-city" disabled>
              يرجى اختيار المدينة والدولة اولا
            </option>
            <option value="" disabled selected hidden>
              عدد الأسابيع
            </option>
            {weeks
              .map((e) => e.weeks)
              .filter((value, index, self) => self.indexOf(value) === index) // getting only uniqe values
              .map((e) => (
                <option value={e}> {e}</option>
              ))}
          </select>
          <input type="submit" value="ابحث"></input>
        </form>
      </div>
      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                alt=""
                width="60"
                height="60"
                src="assets/icons/passport-ticket-icon.png"
              />
              <h5>الاقامة</h5>
            </div>
            <div className="col-md-3">
              <img
                alt=""
                width="60"
                height="60"
                src="assets/icons/home-icon.png"
              />
              <h5>تأمين السكن</h5>
            </div>
            <div className="col-md-3">
              <img
                alt=""
                width="60"
                height="60"
                src="assets/icons/advisor-icon.png"
              />
              <h5>مستشار دائم</h5>
            </div>
            <div className="col-md-3">
              <img
                alt=""
                width="60"
                height="60"
                src="assets/icons/passport-ticket-icon.png"
              />
              <h5>استقبال وتوديع بالمطار</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="study-intro ">
        <h2>برامجنا التعليمية</h2>
        {courses.map((course) => (
          <RenderIntroCourse course={course}></RenderIntroCourse>
        ))}
      </div>
      <a href="#" className="red-button">
        تصفح المزيد من الكورسات
      </a>
    </div>
  );
}

function RenderIntroCourse(props) {
  return (
    <div>
      <div className=" study-program container-fluid">
        <div className="row">
          <div className="col-md-4">
            <img alt=" " src={props.course.image_link} />
          </div> 
          <div className="col-md-8">
            <h5 className="institution-name">{props.course.name}</h5>
            <h5 className="institution-header">
              {props.course.country}{" "}
              <img alt=" " src="assets/icons/map-pin-icon.png" />
            </h5>
            <h5 className="institution-header">
              {props.course.hours} ساعة خلال الاسبوع{" "}
              <img alt=" " src="assets/icons/calendar-icon.png" />
            </h5>
            <p>
              {props.course.description.split(".").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </p>
            <a className="red-button" href="#">
              عرض كل التفاصيل
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;

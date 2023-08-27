import "./courses-list.css";
import { useEffect, useState } from "react";
import { supabase } from "../../client";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCourses();
    getSearchValues();

    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }, []);

  async function getCourses() {
    const { data } = await supabase.from("courses").select();
    setCourses(data);
  }

  async function getCities(country) {
    const { data } = await supabase
      .from("courses")
      .select("city")
      .eq("country", country);
    setCities(data);
  }

  function handleCountryChange(event) {
    getCities(event.target.value);
    let handler = document.getElementById("select-city");
    handler.value = "";
    if (document.getElementById("please-select-country")) {
      let pleaseSelectCountry = document.getElementById(
        "please-select-country"
      );
      pleaseSelectCountry.remove();
    }
  }

  async function getSearchValues() {
    const { data } = await supabase
      .from("courses")
      .select("country,city,type,weeks")
      .order("weeks", { ascending: true })
      .order("country", { ascending: true });

    setSearchValues(data);
  }

  async function search() {
    let selectName = document.getElementById("search-name");
    let selectCountry = document.getElementById("select-country");
    let selectCity = document.getElementById("select-city");
    let selectWeeks = document.getElementById("select-weeks");
    let selectType = document.getElementById("select-type");
    let courses;

    if (selectName.value != "") {
      const { data } = await supabase
        .from("courses")
        .select()
        .textSearch("name", selectName.value);
      courses = data;
    } else {
      const { data } = await supabase.from("courses").select();
      courses = data;
    }

    if (selectCountry.value != "")
      courses = courses.filter((item) => item.country == selectCountry.value);
    if (selectCity.value != "")
      courses = courses.filter((item) => item.city == selectCity.value);
    if (selectType.value != "")
      courses = courses.filter((item) => item.type == selectType.value);
    if (selectWeeks.value != "")
      courses = courses.filter((item) => item.weeks == selectWeeks.value);

    setCourses(courses);
  }

  return (
    <div>
      <div className="list-header">
        <h4>كورسات الدراسة في الخارج </h4>
        <h5>نعرض لك افضل الكورسات و المعاهد استكشف فرص الدراسة في الخارج</h5>
      </div>
      <div id="search-course" className="container-fluid">
        <div className="row">
          <div className="col-md-3  ">
            <div>
              <button class="collapsible">البحث عن كورس</button>
              <div class="content">
                <label for="search-name">ابحث عن اسم المعهد</label>
                <input
                  id="search-name"
                  type="text"
                  placeholder="بحث...."
                ></input>

                <label for="select-country">الدولة</label>
                <select id="select-country" onChange={handleCountryChange}>
                  <option value="" disabled selected hidden>
                    اختر الدولة
                  </option>
                  {searchValues
                    .map((e) => e.country)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .map((e) => (
                      <option value={e}> {e}</option>
                    ))}
                </select>

                <label for="select-city">المدينة</label>
                <select id="select-city">
                  <option value="" selected hidden>
                    اختر المدينة
                  </option>
                  <option disabled id="please-select-country">
                    يرجى اختيار الدولة اولا
                  </option>
                  {cities
                    .map((e) => e.city)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .map((e) => (
                      <option value={e}> {e}</option>
                    ))}
                </select>

                <label for="select-weeks">عدد الاسابيع</label>
                <select id="select-weeks">
                  <option value="" selected hidden disabled>
                    اختر عدد الاسابيع
                  </option>
                  {searchValues
                    .map((e) => e.weeks)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .map((e) => (
                      <option value={e}> {e}</option>
                    ))}
                </select>

                <label for="select-type">نوع الكورس</label>
                <select id="select-type">
                  <option value="" selected hidden disabled>
                    اختر نوع الكورس
                  </option>
                  {searchValues
                    .map((e) => e.type)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .map((e) => (
                      <option value={e}> {e}</option>
                    ))}
                </select>

                <button className="search-button" onClick={search}>
                  بحث
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {}
              {courses.length > 0 ? (
                courses.map((course) => (
                  <RenderCourse course={course}></RenderCourse>
                ))
              ) : (
                <h4 >عذرا لا يوجد نتائج للبحث</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderCourse(props) {
  return (
    <div className=" col-md-4">
      <div className="courses-list">
        <img width="100%" src={props.course.image_link} />
        <a href="#">
          {props.course.name.split(".").map((item, index) => (
            <h6 key={index}>{item}</h6>
          ))}
        </a>
        <h6>{props.course.type}</h6>
        <span>
          <img
            className="courses-list-icon"
            src="assets/icons/map-pin-icon.png"
          />
          <p>{props.course.country}</p>
        </span>
        <div className="courses-list-group">
          <div>
            <img
              className="courses-list-icon"
              src="/assets/icons/mobile-signal-icon.png"
            />
            <p>مبتدئ {props.course.level}</p>
          </div>
          <div>
            <img
              className="courses-list-icon"
              src="/assets/icons/male-icon.png"
            />
            <p>{props.course.age} عاما</p>
          </div>
          <div>
            <img
              className="courses-list-icon"
              src="/assets/icons/project-icon.png"
            />
            <p>{props.course.weeks} ساعة</p>
          </div>
        </div>

        <p id="courses-list-price">{props.course.price} ر.س</p>
      </div>
    </div>
  );
}
export default CourseList;

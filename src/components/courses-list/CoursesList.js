import "./courses-list.css";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import { isEmpty } from "lodash";

function CourseList() {
  let numberOfCoursesInPage = 9;
  const location = useLocation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [cities, setCities] = useState([]);

  const totalPages = Math.ceil(courses.length / numberOfCoursesInPage); //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showedCourses, setShowedCourses] = useState([]);

  useEffect(() => {
    if (isEmpty(location.state)) getCourses();
    else listPageSearch();
    getSearchValues();
    navigate(".", { state: {} });

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
    let noCourses = document.getElementById("no-courses");
    if (noCourses !== null) noCourses.style.opacity = "0";
  }, []);

  async function listPageSearch() {
    if (isEmpty(location.state)) {
      console.log(location.state.country);
    } else {
      let courses;
      const { data } = await supabase.from("courses").select();
      courses = data;
      if (location.state.country) {
        courses = courses.filter(
          (item) => item.country === location.state.country
        );
      }

      if (location.state.city)
        courses = courses.filter((item) => item.city === location.state.city);
      if (location.state.weeks)
        courses = courses.filter(
          (item) => item.weeks === parseInt(location.state.weeks)
        );
      console.log(courses);
      setCourses(courses);

      let noCourses = document.getElementById("no-courses");
      if (noCourses !== null) noCourses.style.display = "block";
    }
  }

  async function getCourses() {
    const { data } = await supabase.from("courses").select();
    setCourses(data);
    if (isEmpty(showedCourses)) {
      setShowedCourses(
        data.slice(
          (currentPage - 1) * numberOfCoursesInPage,
          currentPage * numberOfCoursesInPage
        )
      );
    }
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

    if (selectName.value !== "") {
      const { data } = await supabase
        .from("courses")
        .select()
        .textSearch("name", selectName.value);
      courses = data;
    } else {
      const { data } = await supabase.from("courses").select();
      courses = data;
    }

    if (selectCountry.value !== "")
      courses = courses.filter((item) => item.country === selectCountry.value);
    if (selectCity.value !== "")
      courses = courses.filter((item) => item.city === selectCity.value);
    if (selectType.value !== "")
      courses = courses.filter((item) => item.type === selectType.value);
    if (selectWeeks.value !== "")
      courses = courses.filter(
        (item) => item.weeks === parseInt(selectWeeks.value)
      );

    setCurrentPage(1);
    setCourses(courses);
    setShowedCourses(
      courses.slice(
        // 1 is used insted of current page because of error
        (1 - 1) * numberOfCoursesInPage,
        1 * numberOfCoursesInPage
        // (currentPage - 1) * numberOfCoursesInPage,
        // currentPage * numberOfCoursesInPage
      )
    );

    let noCourses = document.getElementById("no-courses");
    if (noCourses !== null) noCourses.style.display = "block";
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
    let showedcourses;
    showedcourses = courses.slice(
      (page - 1) * numberOfCoursesInPage,
      page * numberOfCoursesInPage
    );
    setShowedCourses(showedcourses);
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
              {courses.length > 0 ? (
                showedCourses.map((course) => (
                  <RenderCourse course={course}></RenderCourse>
                ))
              ) : (
                <h4 id="no-courses">عذرا لا يوجد نتائج للبحث</h4>
              )}
            </div>
            <ResponsivePagination
              total={totalPages}
              current={currentPage}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderCourse(props) {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="courses-list">
        <Link to={"/courseDetails/" + props.course.id}>
          <img alt=" " width="100%" src={props.course.image_link} />
        </Link>
        <Link to={"/courseDetails/" + props.course.id}>
          {props.course.name.split(".").map((item, index) => (
            <h6 key={index}>{item}</h6>
          ))}
        </Link>
        <Link to={"/courseDetails/" + props.course.id}>
          <h6>{props.course.type}</h6>
        </Link>
        <span>
          <img
            alt=" "
            className="courses-list-icon"
            src="assets/icons/map-pin-icon.png"
          />
          <p>{props.course.country}</p>
        </span>
        <div className="courses-list-group">
          <div>
            <img
              alt=" "
              className="courses-list-icon"
              src="/assets/icons/mobile-signal-icon.png"
            />
            <p> {props.course.level}</p>
          </div>
          <div>
            <img
              alt=" "
              className="courses-list-icon"
              src="/assets/icons/male-icon.png"
            />
            <p>{props.course.age} عاما</p>
          </div>
          <div>
            <img
              alt=" "
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

import "./courses-list.css";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import { isEmpty } from "lodash";

function CourseList() {
  let numberOfCoursesInPage = 9;
  const location = useLocation();
  const navigate = useNavigate();

  const nameRef = useRef();
  const typeRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const weeksRef = useRef();

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    type: "",
    weeks: null,
  });
  const [searchValues, setSearchValues] = useState([]);
  const [cities, setCities] = useState([]);

  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showedCourses, setShowedCourses] = useState([]);
  const [searched, setSearched] = useState([false]);

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
      const { data } = await supabase
        .from("courses")
        .select()
        .order("create_date", { ascending: false });
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
    const { data, count } = await supabase
      .from("courses")
      .select("id,name,image_link,type,country,level,age,weeks,price", {
        count: "exact",
      })
      .order("create_date", { ascending: false })
      .range(
        (currentPage - 1) * numberOfCoursesInPage,
        currentPage * numberOfCoursesInPage - 1
      );

    setTotalPages(Math.ceil(count / numberOfCoursesInPage));
    setShowedCourses(data);
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

  async function search(page) {
    let selectName = document.getElementById("search-name");
    let selectCountry = document.getElementById("select-country");
    let selectCity = document.getElementById("select-city");
    let selectWeeks = document.getElementById("select-weeks");
    let selectType = document.getElementById("select-type");

    let query = supabase
      .from("courses")
      .select("id,name,image_link,type,country,level,age,weeks,price", {
        count: "exact",
      })
      .order("create_date", { ascending: false })
      .range(
        (page - 1) * numberOfCoursesInPage,
        page * numberOfCoursesInPage - 1
      );

    if (selectName.value !== "") {
      query.textSearch("name", selectName.value);
    }
    if (selectCountry.value !== "") query.eq("country", selectCountry.value);
    if (selectCity.value !== "") query.eq("city", selectCity.value);
    if (selectType.value !== "") query.eq("type", selectType.value);
    if (selectWeeks.value !== "") query.eq("weeks", selectWeeks.value);

    const { data, count } = await query;

    setCurrentPage(page);
    setTotalPages(Math.ceil(count / numberOfCoursesInPage));
    setShowedCourses(data);
    setSearched(true);

    let noCourses = document.getElementById("no-courses");
    if (noCourses !== null) noCourses.style.display = "block";
  }

  async function handlePageChange(page) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
    // ... do something with `page`

    if (searched) {
      let query = supabase
        .from("courses")
        .select("id,name,image_link,type,country,level,age,weeks,price")
        .order("create_date", { ascending: false })
        .range(
          (page - 1) * numberOfCoursesInPage,
          page * numberOfCoursesInPage - 1
        );

      // if (formData.name !== "") query.textSearch("name", formData.name);
      // if (formData.country !== "") query.eq("country", formData.country);
      // if (formData.city !== "") query.eq("city", formData.city);
      // if (formData.type !== "") query.eq("type", formData.type);
      console.log(formData);
      if (formData.weeks !== null) {
        query.eq("weeks", formData.weeks);
        console.log("week search");
      }
      const { data } = await query;
      console.log(data);
      console.log(searched);
      setShowedCourses(data);
    } else {
      const { data } = await supabase
        .from("courses")
        .select("id,name,image_link,type,country,level,age,weeks,price")
        .order("create_date", { ascending: false })
        .range(
          (page - 1) * numberOfCoursesInPage,
          page * numberOfCoursesInPage - 1
        );
      setShowedCourses(data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = new FormData(event.target);

    setFormData({
      name: newFormData.get("name"),
      country: newFormData.get("country"),
      city: newFormData.get("city"),
      type: newFormData.get("type"),
      weeks: newFormData.get("weeks"),
    });
  };

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
                <form onSubmit={handleSubmit}>
                  <label for="search-name">ابحث عن اسم المعهد</label>
                  <input
                    ref={nameRef}
                    id="search-name"
                    type="text"
                    placeholder="بحث...."
                    name="name"
                  ></input>
                  <label for="select-country">الدولة</label>
                  <select
                    ref={countryRef}
                    id="select-country"
                    onChange={handleCountryChange}
                    name="country"
                  >
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
                  <select ref={cityRef} id="select-city" name="city">
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
                  <select ref={weeksRef} id="select-weeks" name="weeks">
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
                  <select ref={typeRef} id="select-type" name="type">
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

                  <input
                    type={"submit"}
                    value="بحث"
                    className="search-button"
                    onClick={() => search(1)}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {showedCourses.length > 0 ? (
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

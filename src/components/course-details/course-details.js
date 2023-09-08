import "./course-details.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../client";
import Modal from "../modal/modal";
import { FaHouseChimney, FaUserLarge, FaBed, FaBath } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import BookCourse from "../book-course/bookCourse";

function CourseDetails() {
  const param = useParams();
  const [course, setCourse] = useState([]);
  const [homes, setHomes] = useState([]);
  const [airportReception, setAirportReception] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [courseData, setCourseData] = useState({
    date: null,
    weeks: "",
    airportReception: null,
    homeId: null,
    courseId: param.id,
  });

  useEffect(() => {
    getCourse(param.id);
    getHomes(param.id);
    getAirportReception(param.id);

    const numberInput = document.querySelector('input[type="number"]');
    numberInput.addEventListener("wheel", (event) => {
      event.preventDefault();
    });
  }, []);

  async function getHomes(courseId) {
    const { data } = await supabase
      .from("homes")
      .select()
      .eq("course_id", courseId);
    setHomes(data);
  }
  async function getAirportReception(courseId) {
    const { data } = await supabase
      .from("airport_reception")
      .select()
      .eq("course_id", courseId);
    setAirportReception(data);
  }
  async function getCourse(id) {
    const { data } = await supabase.from("courses").select().eq("id", id);
    setCourse(data[0]);
  }

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="course-details">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <HomeOptions
          handleChange={handleChange}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <Modal open={booking} onClose={() => setBooking(false)}>
        <BookCourse courseData={courseData}></BookCourse>
      </Modal>
      <div className="course-details-header">
        <h3>{course.name}</h3>
        <h6>{course.country + "," + course.city}</h6>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <img alt="" id="course-image" src={course.image_link} />
            </div>
            <div className=" info">
              <div id="course-info-group" className="row">
                <div className="col-4 course-info">
                  <div className="course-icons">
                    <img
                      alt=""
                      className="course-icons"
                      src="/assets/icons/mobile-signal-icon.png"
                    />
                  </div>
                  <div className="course-info-details">
                    <h6>ساعات الدوام</h6>
                    <p>{course.hours} ساعة</p>
                  </div>
                </div>
                <div className="col-4 course-info">
                  <div>
                    <img
                      alt=""
                      className="course-icons"
                      src="/assets/icons/male-icon.png"
                    />
                  </div>
                  <div className="course-info-details">
                    <h6>العمر المطلوب</h6>
                    <p>{course.age} سنة</p>
                  </div>
                </div>
                <div className="col-4 course-info">
                  <div className="course-icons">
                    <img
                      alt=""
                      className="course-icons"
                      src="/assets/icons/project-icon.png"
                    />
                  </div>
                  <div className="course-info-details">
                    <h6>مستوى اللغة</h6>
                    <p>{course.level}</p>
                  </div>
                </div>
              </div>
              <div className="course-discription">
                <h6>معلومات عن الدورة</h6>
                <p>
                  {course.length == 0 ? (
                    <div></div>
                  ) : (
                    course.description
                      .split(".")
                      .map((item, index) => <p key={index}>{item}.</p>)
                  )}{" "}
                </p>
                <h6>تتضمن الدورة</h6>
                <ol>
                  {course.length == 0 ? (
                    <div></div>
                  ) : (
                    course.details
                      .split(".")
                      .map((item, index) => <li key={index}>{item}.</li>)
                  )}{" "}
                </ol>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="price">
              <h4>التكاليف</h4>
              <div className="price-line">
                <h6>حجز الدورة:</h6>
                <p>{course.price}</p>
              </div>
              <div className="price-line">
                <h6>رسوم الكتب الدراسية:</h6>
                <p>{course.book_price} ر.س</p>
              </div>
              <div className="price-line">
                <h6>إجمالي السعر:</h6>
                <p>{course.book_price + course.price} ر.س</p>
              </div>
            </div>
            <div className="booking">
              <h4>الحجز و التقديم</h4>
              <label for="date-selector">تاريخ البدء:</label>
              <input
                id="date-selector"
                name="date"
                onChange={handleChange}
                type="date"
                required
              />
              <label for="weeks-number">عدد الاسابيع :</label>
              <input
                id="weeks-number"
                name="weeks"
                onChange={handleChange}
                type="number"
                required
              />
              <h6>السكن</h6>
              <button onClick={() => setIsOpen(true)}>
                خيارات السكن المتاحة
              </button>
              <label>الاستقبال في المطار:</label>
              <select name="airportReception" onChange={handleChange}>
                <option>لا اريد خدمة الاستقبال في المطار</option>
                {airportReception.map((e) => (
                  <option value={e.id}>
                    {e.airport_name}, {e.type} , {e.price}ر.س
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (validateForm()) {
                    setBooking(true);
                    console.log(courseData);
                  } else alert("يرجى تعبئة جميع الحقول");
                }}
              >
                احجز الان
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function HomeOptions({ handleChange, onClose }) {
    return (
      <div className="home-options">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input
                value={null}
                type="radio"
                name="homeId"
                onChange={(e) => {
                  onClose();
                  handleChange(e);
                }}
              />
              <h5>لست بحاجة سكن</h5>
            </div>
          </div>
          {homes.map((e) => (
            <div className="row">
              <div className="col-12">
                <input
                  value={e.id}
                  type="radio"
                  name="homeId"
                  onChange={(e) => {
                    onClose();
                    handleChange(e);
                  }}
                />
                <h5>
                  {e.type} - {e.price} ر.س
                </h5>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <FaHouseChimney size={30} color="#274073"></FaHouseChimney>
                <div className="home-description">
                  <h6>نوع السكن</h6>
                  <p>{e.type}</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <FaUserLarge size={30} color="#274073"></FaUserLarge>
                <div className="home-description">
                  <h6>العمر</h6>
                  <p>{e.age}</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <FaBed size={30} color="#274073"></FaBed>
                <div className="home-description">
                  <h6>نوع الغرفة</h6>
                  <p>{e.room_type}</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <GiMeal size={30} color="#274073"></GiMeal>
                <div className="home-description">
                  <h6>الوجبات</h6>
                  <p>{e.meals}</p>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-2">
                <FaBath size={30} color="#274073"></FaBath>
                <div className="home-description">
                  <h6>الحمام</h6>
                  <p>{e.bathroom}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function validateForm() {
  var isValid = true;
  var requiredFields = document.querySelectorAll("input[required]");
  for (var i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value === "") {
      isValid = false;
      break;
    }
  }
  return isValid;
}

export default CourseDetails;

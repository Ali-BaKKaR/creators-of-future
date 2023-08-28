import "./course-details.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../client";
import Modal from "../modal/modal";
import { FaHouseChimney, FaUserLarge, FaBed, FaBath } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

function CourseDetails() {
  const param = useParams();
  const [course, setCourse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCourse(param.id);
  }, []);

  async function getCourse(id) {
    console.log(id);
    const { data } = await supabase.from("courses").select().eq("id", id);
    setCourse(data[0]);
  }

  return (
    <div className="course-details">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <HomeOptions />
      </Modal>
      <div className="course-details-header">
        <h3>{course.name}</h3>
        <h6>{course.country + "," + course.city}</h6>
        <h1></h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <img id="course-image" src={course.image_link} />
            </div>
            <div className=" info">
              <div id="course-info-group" className="row">
                <div className="col-4 course-info">
                  <div className="course-icons">
                    <img
                      className="course-icons"
                      src="/assets/icons/mobile-signal-icon.png"
                    />
                  </div>
                  <div>
                    <h6>ساعات الدوام</h6>
                    <p>{course.hours} ساعة</p>
                  </div>
                </div>
                <div className="col-4 course-info">
                  <div>
                    <img
                      className="course-icons"
                      src="/assets/icons/male-icon.png"
                    />
                  </div>
                  <div>
                    <h6>الحد الادنى للعمر</h6>
                    <p>{course.age} سنة</p>
                  </div>
                </div>
                <div className="col-4 course-info">
                  <div className="course-icons">
                    <img
                      className="course-icons"
                      src="/assets/icons/project-icon.png"
                    />
                  </div>
                  <div>
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
              <input id="date-selector" type="date" />
              <label for="weeks-number">عدد الساعات :</label>
              <input id="weeks-number" type="number" />
              <h6>السكن</h6>
              <button onClick={() => setIsOpen(true)}>
                خيارات السكن المتاحة
              </button>
              <label>الاستقبال في المطار:</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function HomeOptions() {
    return (
      <div className="home-options">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input
                type="radio"
                name="home"
              />
              <h5>لست بحاجة سكن</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <input
                type="radio"
                name="home"
              />
              <h5>سكن مع عائلة - 200 ر.س</h5>
            </div>
            <div className="col-6 col-md-2">
              <FaHouseChimney size={30} color="#274073"></FaHouseChimney>
              <div className="home-description">
                <h6>نوع السكن</h6>
                <p>مع عائلة</p>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <FaUserLarge size={30} color="#274073"></FaUserLarge>
              <div className="home-description">
                <h6>العمر</h6>
                <p>20</p>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <FaBed size={30} color="#274073"></FaBed>
              <div className="home-description">
                <h6>نوع الغرفة</h6>
                <p>غرفة فردية</p>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <GiMeal size={30} color="#274073"></GiMeal>
              <div className="home-description">
                <h6>الوجبات</h6>
                <p>غداء و عشاء</p>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <FaBath size={30} color="#274073"></FaBath>
              <div className="home-description">
                <h6>الحمام</h6>
                <p>مشترك</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetails;

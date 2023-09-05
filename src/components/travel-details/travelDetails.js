import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";
import { BiTimeFive, BiSolidCity } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";

import "./travelDetails.css";

export default function TravelDetails() {
  const param = useParams();
  const [travel, setTravel] = useState([]);
  const [days, setDays] = useState([]);
  const [daysLoaded, setDaysLoaded] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: null,
  });

  useEffect(() => {
    getTravel(param.id);
    getDays(param.id);
  }, []);

  useEffect(() => {
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
  }, [daysLoaded]);

  async function getTravel(travelId) {
    const { data } = await supabase.from("travels").select().eq("id", travelId);
    setTravel(data[0]);
  }
  async function getDays(travelId) {
    const { data } = await supabase
      .from("days_description")
      .select()
      .eq("travel_id", travelId);
    setDays(data);
    setDaysLoaded(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { error } = await supabase.from("travel_book").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      travel_id: param.id,
    });
    if (error === null) {
      alert("شكرا لك تم التسجيل بنجاح,سنتواصل معك لتاكيد المعلومات");
      document.location.reload();
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="travel-details">
      <div className="travel-details-header">
        <h3>{travel.name}</h3>
        <h6>{travel.destination}</h6>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <img alt="" id="travel-image" src={travel.image_link} />
            </div>
            <div className=" info">
              <div id="travel-info-group" className="row">
                <div className="col-4 travel-info">
                  <div className="travel-icons">
                    <ImPriceTag size={40} color="#274073"></ImPriceTag>
                  </div>
                  <div>
                    <h6>السعر</h6>
                    <p>{travel.price} ر.س</p>
                  </div>
                </div>
                <div className="col-4 travel-info">
                  <div>
                    <BiSolidCity size={40} color="#274073"></BiSolidCity>
                  </div>
                  <div>
                    <h6>تبدأ في</h6>
                    <p>{travel.city} </p>
                  </div>
                </div>
                <div className="col-4 travel-info">
                  <div className="travel-icons">
                    <BiTimeFive size={40} color="#274073"></BiTimeFive>
                  </div>
                  <div>
                    <h6>المدة</h6>
                    <p>{travel.duration} ايام</p>
                  </div>
                </div>
              </div>
              <div className="travel-discription">
                <h6>معلومات عن الرحلة</h6>
                <p>
                  {travel.length == 0 ? (
                    <div></div>
                  ) : (
                    travel.description
                      .split(".")
                      .map((item, index) => <p key={index}>{item}.</p>)
                  )}{" "}
                </p>
                <h6>تتضمن الرحلة</h6>
                <ol>
                  {travel.length == 0 ? (
                    <div></div>
                  ) : (
                    travel.details
                      .split(".")
                      .map((item, index) => <li key={index}>{item}.</li>)
                  )}{" "}
                </ol>
                <div id="search-course">
                  {days.map((e) => (
                    <div>
                      <button class="collapsible">{e.name}</button>
                      <div class="content">
                        {e.description.split(".").map((item, index) => (
                          <p key={index}>{item}.</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="book-travel booking">
              <form onSubmit={handleSubmit}>
                <h6>الاسم: </h6>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="ادخل الاسم الكامل"
                />
                <h6>البريد الاكتروني:</h6>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ادخل البريد الالكتروني"
                />
                <h6>رقم الهاتف : </h6>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="ادخل رقم الهاتف"
                />
                <input type="submit" value="احجز الان" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

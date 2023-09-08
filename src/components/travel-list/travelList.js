import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import "./travelList.css";
import ResponsivePagination from "react-responsive-pagination";
import { isEmpty } from "lodash";

function TravelList() {
  let numberOfTravelsInPage = 9;
  
  const [travels, settravels] = useState([]);
  const [searchValues, setSearchValues] = useState([]);

  const totalPages = Math.ceil(travels.length / numberOfTravelsInPage); //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showedTravels, setShowedTravels] = useState([]);

  ////end of pagination
  useEffect(() => {
    getTravels();
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

    let noTravel = document.getElementById("no-travel");
    if (noTravel !== null) noTravel.style.opacity = "0";
  }, []);

  async function getTravels() {
    const { data } = await supabase
      .from("travels")
      .select()
      .order("create_date", { ascending: false });
    settravels(data);
    if (isEmpty(showedTravels)) {
      setShowedTravels(
        data.slice(
          (currentPage - 1) * numberOfTravelsInPage,
          currentPage * numberOfTravelsInPage
        )
      );
    }
  }

  async function getSearchValues() {
    const { data } = await supabase
      .from("travels")
      .select()
      .order("create_date", { ascending: false });
    setSearchValues(data);
  }

  async function search() {
    let selectName = document.getElementById("search-name");
    let selectDestination = document.getElementById("select-destination");
    let selectDuration = document.getElementById("select-duration");

    let travels;

    if (selectName.value !== "") {
      const { data } = await supabase
        .from("travels")
        .select()
        .textSearch("name", selectName.value);
      travels = data;
    } else {
      const { data } = await supabase.from("travels").select();
      travels = data;
    }

    if (selectDestination.value !== "")
      travels = travels.filter(
        (item) => item.destination === selectDestination.value
      );

    if (selectDuration.value !== "")
      travels = travels.filter(
        (item) => item.duration === parseInt(selectDuration.value)
      );
    console.log(travels);
    setCurrentPage(1);
    settravels(travels);
    setShowedTravels(
      travels.slice(
        // 1 is used insted of current page because of error
        (1 - 1) * numberOfTravelsInPage,
        1 * numberOfTravelsInPage
        // (currentPage - 1) * numberOfTravelsInPage,
        // currentPage * numberOfTravelsInPage
      )
    );

    let noTravel = document.getElementById("no-travel");
    if (noTravel !== null) noTravel.style.display = "block";
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
    let showedtravels;
    showedtravels = travels.slice(
      (page - 1) * numberOfTravelsInPage,
      page * numberOfTravelsInPage
    );
    setShowedTravels(showedtravels);
  }

  return (
    <div className="travel-list">
      <div className="list-header">
        <h4>الرحلات السياحية </h4>
        <h5>
          نوفر لك مجموعة من افضل البرامج السياحية ,استكشف الرحلات والبرامج
          المتاحة لدينا.
        </h5>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3  ">
            <div id="search-course">
              <button class="collapsible">البحث عن رحلة</button>
              <div class="content">
                <label for="search-name">ابحث عن اسم المعهد</label>
                <input
                  id="search-name"
                  type="text"
                  placeholder="بحث...."
                ></input>
                <label for="select-destination">الوجهة</label>
                <select id="select-destination">
                  <option value="" disabled selected hidden>
                    اختر الوجهة
                  </option>
                  {searchValues
                    .map((e) => e.destination)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .map((e) => (
                      <option value={e}> {e}</option>
                    ))}
                </select>

                <label for="select-duration"> المدة</label>
                <select id="select-duration">
                  <option value="" selected hidden disabled>
                    اختر مدة الرحلة
                  </option>
                  {searchValues
                    .map((e) => e.duration)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // getting only uniqe values
                    .sort((a, b) => a - b)
                    .map((e) => (
                      <option value={e}> {e} اسبوع</option>
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
              {travels.length > 0 ? (
                showedTravels.map((travel) => (
                  <div className="col-md-4 col-sm-6 col-12">
                    <RenderTravel travel={travel}></RenderTravel>
                  </div>
                ))
              ) : (
                <h4 id="no-travel">عذرا لا يوجد نتائج للبحث</h4>
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
function RenderTravel(props) {
  return (
    <div className="render-travel">
      <Link to={"/travelDetails/" + props.travel.id}>
        <img src={props.travel.image_link}></img>
      </Link>
      <div className="render-travel-details">
        <Link to={"/travelDetails/" + props.travel.id}>
          <h6>{props.travel.name}</h6>
        </Link>
        <span>
          <h6>{props.travel.destination}</h6>
          <img
            alt=" "
            className="travel-list-icon"
            src="assets/icons/map-pin-icon.png"
          />
        </span>
        <p>
          {props.travel.description.split(".").map((item, index) => (
            <div key={index}>{item}.</div>
          ))}
        </p>
        <div className="list-button">
          <div></div>
          {/* spacer */}
          <Link
            to={"/travelDetails/" + props.travel.id}
            className="small-red-button"
          >
            اقرأ المزيد
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TravelList;

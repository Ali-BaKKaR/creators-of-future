import React from "react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import "./travelList.css";
import ResponsivePagination from "react-responsive-pagination";

function TravelList() {
  let numberOfTravelsInPage = 9;

  const [searchValues, setSearchValues] = useState([]);
  const nameRef = useRef();
  const destinationRef = useRef();
  const durationRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
  });

  // const totalPages = Math.ceil(travels.length / numberOfTravelsInPage); //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showedTravels, setShowedTravels] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [searched, setSearched] = useState([false]);
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
    const { data, count } = await supabase
      .from("travels")
      .select("id,name,destination,description,image_link", { count: "exact" })
      .order("create_date", { ascending: false })
      .range(
        (currentPage - 1) * numberOfTravelsInPage,
        currentPage * numberOfTravelsInPage - 1
      );

    setTotalPages(Math.ceil(count / numberOfTravelsInPage));
    setShowedTravels(data);
  }

  async function getSearchValues() {
    const { data } = await supabase
      .from("travels")
      .select()
      .order("create_date", { ascending: false });
    setSearchValues(data);
  }

  async function search(page) {
    let selectName = document.getElementById("search-name");
    let selectDestination = document.getElementById("select-destination");
    let selectDuration = document.getElementById("select-duration");

    let query = supabase
      .from("travels")
      .select("id,name,destination,description,image_link", { count: "exact" })
      .order("create_date", { ascending: false })
      .range(
        (page - 1) * numberOfTravelsInPage,
        page * numberOfTravelsInPage - 1
      );
    if (selectName.value !== "") query.textSearch("name", selectName.value);

    if (selectDestination.value !== "")
      query.eq("destination", selectDestination.value);

    if (selectDuration.value !== "") query.eq("duration", selectDuration.value);

    const { data, count } = await query;
    setCurrentPage(page);
    setTotalPages(Math.ceil(count / numberOfTravelsInPage));
    setShowedTravels(data);
    setSearched(true);

    let noTravel = document.getElementById("no-travel");
    if (noTravel !== null) noTravel.style.display = "block";
  }

  async function handlePageChange(page) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);

    if (searched) {
      let query = supabase
        .from("travels")
        .select("id,name,destination,description,image_link")
        .order("create_date", { ascending: false })
        .range(
          (page - 1) * numberOfTravelsInPage,
          page * numberOfTravelsInPage - 1
        );

      if (formData.name !== '') query.textSearch("name", formData.name);

      if (formData.destination !== '')
        query.eq("destination", formData.destination);

      if (formData.duration !== null) query.eq("duration", formData.duration);

      const { data } = await query;
      console.log(data);
      setShowedTravels(data);
    } else {
      const { data } = await supabase
        .from("travels")
        .select("id,name,destination,description,image_link")
        .order("create_date", { ascending: false })
        .range(
          (page - 1) * numberOfTravelsInPage,
          page * numberOfTravelsInPage - 1
        );
      setShowedTravels(data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = new FormData(event.target);
    setFormData({
      name: newFormData.get("name"),
      destination: newFormData.get("destination"),
      duration: newFormData.get("duration"),
    });
  };


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
                <form onSubmit={handleSubmit}>
                  <label for="search-name">ابحث عن اسم الرحلة</label>
                  <input
                    id="search-name"
                    type="text"
                    name="name"
                    ref={nameRef}
                    placeholder="بحث...."
                  ></input>
                  <label for="select-destination">الوجهة</label>
                  <select
                    ref={destinationRef}
                    id="select-destination"
                    name="destination"
                  >
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
                  <select
                    ref={durationRef}
                    id="select-duration"
                    name="duration"
                  >
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
              {showedTravels.length > 0 ? (
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

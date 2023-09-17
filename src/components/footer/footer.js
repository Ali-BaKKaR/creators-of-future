import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { BiPhone } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

export default function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className=" container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 logo">
              <img src="/assets/images/logo.png"></img>
              <p>
                مبدعو المتسقبل للسياحة و السفر ,نقدم عروض الرحلات السياحية حول
                العالم و الدراسة في الخارج
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <h6>روابط مهمة</h6>
              <Link to={"/about-us"}>من نحن</Link>
              <Link to={"/contact-us"}>تواصل معنا</Link>
              <Link to={"/travel"}>الرحلات السياحية</Link>
              <Link to={"/courses"}>الدورات التعليمية</Link>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <h6>تواصل معنا</h6>
              <div className="contact">
                <BiPhone size={30} color={"#274073"}></BiPhone>
                <p>0558288444</p>
              </div>
              <div className="contact">
                <CiMail size={30} color={"#274073"}></CiMail>
                <p>info@creators-of-future.com</p>
              </div>
              <div className="contact">
                <CiLocationOn size={30} color={"#274073"}></CiLocationOn>
                <p>السعودية, جدة, طريق المدينة</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

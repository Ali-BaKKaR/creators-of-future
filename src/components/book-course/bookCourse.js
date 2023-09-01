import React, { useState } from "react";
import "./bookCourse.css";

function BookCourse() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div className="book-course">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-4">
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
              <br />
            </div>
            <div className="col-4">
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
              <br />
            </div>
            <div className="col-4">
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
              <br />
            </div>
            <div className="col-12">
              <h6>الملاحظات : </h6>
            </div>
            <div className="col-12">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="اكتب ملاحظاتك هنا:"
              />
              <br />
            </div>
            <input type="submit" value="احجز" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookCourse;

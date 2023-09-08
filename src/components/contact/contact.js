import React, { useState } from "react";
import { supabase } from "../../client";
import "./contact.css";

export default function Contact() {
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

  async function handleSubmit(event) {
    event.preventDefault();
    const { error } = await supabase.from("contact_us_message").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.message,
    });
    console.log(error)
    if (error === null) {
      alert("شكرا لك تم التسجيل بنجاح,سنتواصل معك باقرب وقت ممكن");
      document.location.reload();
    }
  }

  return (
    <div className="contact-us">
      <div className="container">
        <h4>تواصل معنا</h4>
        <div className="row">
          <div className="col-12 col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.1032291768915!2d39.147956374388485!3d21.62090076717937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3db3fc960d401%3A0x311b0c5dfc0f350!2z2YXZg9iq2Kgg2YTZhNiz2YrYp9it2Kkg2YjYp9mE2LPZgdix!5e0!3m2!1sen!2suk!4v1693933139184!5m2!1sen!2suk"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 col-md-6">
            {" "}
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-12">
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
                  <div className="col-12">
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
                  <div className="col-12">
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
        </div>
      </div>
    </div>
  );
}

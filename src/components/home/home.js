import "./home.css";
import { supabase } from "../../client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    getTravels();
  }, []);

  async function getTravels() {
    const { data } = await supabase
      .from("travels")
      .select("name,destination ,city,intro_text,price,id,image_link  ")
      .eq("home_intro", true);
    setTravels(data);
  }
  return (
    <div>
      <div className="main travel-background">
        <div className="welcome-title">
          <h3>احجز الان</h3>
          <h1>تمتع باجمل الرحلات السياحية</h1>
          <h6>احصل على افضل الخدمات باقل الاسعار</h6>
        </div>
      </div>
      <div className=" services">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-6 col-sm-4">
              <img
                alt=""
                width="60"
                height="60"
                src="assets/icons/english-speaking-icon.png"
              />
              <h5>تعلم الإنجليزية بالخارج</h5>
            </div>
            <div className="col-md-4 col-6 col-sm-4">
              <img alt=" " src="assets/icons/flight-ticket-icon.png" />
              <h5>حجز تذاكر</h5>
            </div>
            <div className="col-md-4 col-6 col-sm-4">
              <img
                alt=" "
                width="60"
                height="60"
                src="assets/icons/driving-card-icon.png"
              />
              <h5>شهادات قيادة دولية</h5>
            </div>
            <div className="col-md-4 col-6 col-sm-4">
              <img alt=" " src="assets/icons/passport-ticket-icon.png" />
              <h5>تأشيرات سياحية</h5>
            </div>
            <div className="col-md-4 col-6 col-sm-4">
              <img alt=" " src="assets/icons/adventure-icon.png" />
              <h5>رحلات سياحية</h5>
            </div>
            <div className="col-md-4 col-6 col-sm-4">
              <img alt=" " src="assets/icons/hotel-icon.png" />
              <h5>حجز فنادق</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container best-offers">
        <div className="best-offers-title">
          <h2>افضل العروض السياحية</h2>
          <p>
            هل تبحث عن وجهة لرحلتك التالية؟, تفقد افضل العروض السياحية لدينا حسب
            تقييم عملائنا لها
          </p>
        </div>
        <div className="row">
          {travels.slice(0, 3).map((e) => (
            <div className="col-md-4">
              <RenderBestOffers travel={e}></RenderBestOffers>
            </div>
          ))}
        </div>
        <div className="red-button">
        <Link to={'travel'}>تصفح المزيد من البكجات</Link>
        </div>
      </div>
      <div className="what-do-we-do">
        <h4 id="what-do-we-do-header">ما هو عملنا</h4>
        <h4>نقوم بإدارة رحلات سياحية وبرامج تعليم اللغة الانجليزية بالخارج </h4>
        <p>
          نقدم خدماتنا في مجال السفر من اجل السياحة و التعلم ونضمن لك العمل
          بسرعة وجودة عالية
        </p>
      </div>
      <div className="container-fluid packages-for-everyone">
        <div className="row">
          <div className="col-md-6">
            <img
              alt=" "
              src="assets/images/package for everyone.png"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-md-6">
            <h4>بكجات مناسبة للجميع</h4>
            <p>
              استمتع ببكجات تناسب الجميع, يمكننا توفير رحلات سياحية لك وحدك او
              لك ولعائلتك ولاصدقائك, يمكننا تنظيم و ترتيب الرحلات بعدة خيارات من
              شركات الطيران و الفنادق لتناسب جميع انواع السفر والسياحة
            </p>
            <p>هل ترغب بالسفر لمناطق طبيعية بمناظر خلابة؟</p>
            <p>هل تحب استكشاف مدن وحضارات ذات طابع معماري فريد ؟</p>
            <p>هل تود التعرف على ثقافات ولغات جديدة؟</p>
            <div className="small-red-button">
              <Link to={'contact-us'}>تواصل معنا</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderBestOffers(props) {
  return (
    <div className="best-offer">
      <Link to={"/travelDetails/" + props.travel.id}>
        <img className="travel-card-image" alt=" " src={props.travel.image_link} width="100%" />
      </Link>
      <div className="container travel-card-details">
        <div className="row">
          <div className="col-md-6 travel-card-details-right">
            <Link to={"/travelDetails/" + props.travel.id}>
              <h4>{props.travel.city}</h4>
              <h4>{props.travel.destination}</h4>
            </Link>
          </div>
          <div className="col-md-6 travel-card-details-left">
            <Link to={"/travelDetails/" + props.travel.id}>
              <p>{props.travel.intro_text}</p>
              <p>{props.travel.price} ر.س</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

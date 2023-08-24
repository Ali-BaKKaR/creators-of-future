import "./courses-list.css";
import { useEffect } from "react";

function CourseList() {

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
    });
    return <div>
        <h6>lfjlsdjflsd</h6>
        <h6>lfjlsdjflsd</h6>
        <h6>lfjlsdjflsd</h6>
        <div id="search-course" className="container-fluid">
            <div className="row">
                <div className="col-md-3  ">
                    <div>
                        <button class="collapsible">البحث عن كورس</button>
                        <div class="content">

                            <label for='search-name'>ابحث عن اسم المعهد</label>
                            <input id="search-name" type='text' placeholder="بحث....">
                            </input>
                            
                            <label for=''>الدولة</label>
                            <select>
                                <option>asd</option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                            <label for=''>المدينة</label>
                            <select>
                                <option>asd</option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                            <label for=''>عدد الساعات بالاسبوع</label>
                            <select>
                                <option>asd</option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                            <label for=''>نوع الكورس</label>
                            <select>
                                <option>asd</option>
                                <option>asd</option>
                                <option>asd</option>
                            </select>
                        </div>

                    </div>

                </div>
                <div className="col-md-9">
                    <div className="row">
                        <RenderCourse></RenderCourse>
                        <RenderCourse></RenderCourse>
                        <RenderCourse></RenderCourse>
                        <RenderCourse></RenderCourse>
                        <RenderCourse></RenderCourse>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function RenderCourse() {
    return <div className=" col-md-4">
        <div className="courses-list">

            <img width="100%" src="./assets/images/roman-synkevych-imlNhL8mk5w-unsplash.jpg"></img>
            <a href="#">

                <h6>معهد مالفيرن هاوس لندن - Malvern House London</h6>
            </a>
            <h6>دورة اللغة الإنجليزية العامة</h6>
            <span>
                <img className="courses-list-icon" src='assets/icons/map-pin-icon.png' />
                <p>المملكة المتحدة</p>
            </span>
            <div className="courses-list-group">
                <div>
                    <img className='courses-list-icon' src='/assets/icons/mobile-signal-icon.png' />
                    <p>مبتدئ A2</p>
                </div>
                <div>
                    <img className='courses-list-icon' src='/assets/icons/male-icon.png' />
                    <p>16 عاما</p>
                </div>
                <div>
                    <img className='courses-list-icon' src='/assets/icons/project-icon.png' />
                    <p>12 ساعة</p>
                </div>
            </div>

            <p id="courses-list-price">855 ر.س</p>
        </div>
    </div>
}
export default CourseList
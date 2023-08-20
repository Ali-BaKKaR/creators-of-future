import './study.css'
function Study() {
    return (
        <div>
            <div className="main study-background">
                <div className='welcome-title '>
                    <h3>
                        نوفر لك
                    </h3>
                    <h1>
                        تدريب في ارقى المعاهد المعتمدة
                    </h1>
                </div>
            </div>
            <div className='search-course'>
                <form>
                    <select >
                        <option value="" disabled selected hidden>الدولة</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                    <select>
                        <option value="" disabled selected hidden>المدينة</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                    <select>
                        <option value="" disabled selected hidden>عدد الأسابيع</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>

                    </select>
                    <input type="submit" value="ابحث"></input>
                </form>
            </div>
            <div className=' services'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <img width='60' height='60' src='assets/icons/passport-ticket-icon.png' />
                            <h5>الاقامة</h5>
                        </div>
                        <div className='col-md-3'>
                            <img width='60' height='60' src='assets/icons/home-icon.png' />
                            <h5>تأمين السكن</h5>
                        </div>
                        <div className='col-md-3'>
                            <img width='60' height='60' src='assets/icons/advisor-icon.png' />
                            <h5>مستشار دائم</h5>
                        </div>
                        <div className='col-md-3'>
                            <img width='60' height='60' src='assets/icons/passport-ticket-icon.png' />
                            <h5>استقبال وتوديع بالمطار</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='study-intro '>
                <h2>برامجنا التعليمية</h2>
                <div className=' study-program container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'><img src='assets/images/library.png' /></div>
                        <div className='col-md-8'>
                            <h5 className='institution-name'>BRITISH COUNSIL</h5>
                            <h5 className='institution-header'>المملكة المتحدة <img src='assets/icons/map-pin-icon.png' /></h5>
                            <h5 className='institution-header'>من اسبوعين الى اربع اسابيع <img src='assets/icons/calendar-icon.png' /></h5>
                            <p>
                                يعتبر معهد British Counsil من افضل معاهد تعليم اللغة الانكليزية في المملكة المتحدة يمكنك الاشتراك بالكورس كامل مع اقامة في المملكة المتحدة.<br />
                                مدة الكورس 20 درس في الاسبوع مع شهادة في نهاية الكورس
                            </p>
                            <a className='red-button' href='#'>عرض كل التفاصيل</a>
                        </div>
                    </div>
                </div>
                <div className=' study-program container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'><img src='assets/images/library.png' /></div>
                        <div className='col-md-8'>
                            <h5 className='institution-name'>BRITISH COUNSIL</h5>
                            <h5 className='institution-header'>المملكة المتحدة <img src='assets/icons/map-pin-icon.png' /></h5>
                            <h5 className='institution-header'>من اسبوعين الى اربع اسابيع <img src='assets/icons/calendar-icon.png' /></h5>
                            <p>
                                يعتبر معهد British Counsil من افضل معاهد تعليم اللغة الانكليزية في المملكة المتحدة يمكنك الاشتراك بالكورس كامل مع اقامة في المملكة المتحدة.<br />
                                مدة الكورس 20 درس في الاسبوع مع شهادة في نهاية الكورس
                            </p>
                            <a className='red-button' href='#'>عرض كل التفاصيل</a>
                        </div>
                    </div>
                </div>
                <div className=' study-program container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'><img src='assets/images/library.png' /></div>
                        <div className='col-md-8'>
                            <h5 className='institution-name'>BRITISH COUNSIL</h5>
                            <h5 className='institution-header'>المملكة المتحدة <img src='assets/icons/map-pin-icon.png' /></h5>
                            <h5 className='institution-header'>من اسبوعين الى اربع اسابيع <img src='assets/icons/calendar-icon.png' /></h5>
                            <p>
                                يعتبر معهد British Counsil من افضل معاهد تعليم اللغة الانكليزية في المملكة المتحدة يمكنك الاشتراك بالكورس كامل مع اقامة في المملكة المتحدة.<br />
                                مدة الكورس 20 درس في الاسبوع مع شهادة في نهاية الكورس
                            </p>
                            <a className='red-button' href='#'>عرض كل التفاصيل</a>
                        </div>
                    </div>
                </div>
            </div>
            <a href='#' className='red-button'>تصفح المزيد من الكورسات</a>
        </div>
    )
}

export default Study;
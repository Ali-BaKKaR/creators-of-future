import './course-details.css'


function CourseDetails() {
    return <div className="course-details">
        <div className='course-details-header'>
            <h3>Language Gallery-BIRMINGHAM</h3>
            <h6>المملكة المتحدة,لندن</h6>

        </div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row'>
                        <img id='course-image' src='assets/images/library.png' />
                    </div>
                    <div className=' info'>
                        <div id='course-info-group' className='row'>
                            <div className='col-4 course-info'>
                                <div className='course-icons'>
                                    <img className='course-icons' src='/assets/icons/mobile-signal-icon.png' />
                                </div>
                                <div>
                                    <h6>ساعات الدوام</h6>
                                    <p>12 ساعة</p>
                                </div>
                            </div>
                            <div className='col-4 course-info'>
                                <div >
                                    <img className='course-icons' src='/assets/icons/male-icon.png' />
                                </div>
                                <div>
                                    <h6>الحد الادنى للعمر</h6>
                                    <p>18 سنة</p>
                                </div>
                            </div>
                            <div className='col-4 course-info'>
                                <div className='course-icons'>
                                    <img className='course-icons' src='/assets/icons/project-icon.png' />
                                </div>
                                <div>
                                    <h6>مستوى اللغة</h6>
                                    <p>B2</p>
                                </div>
                            </div>
                        </div>
                        <div className='course-discription'>

                            <h6>معلومات عن الدورة</h6>
                            <p>ستتمكن في هذه الدورة على تطوير مهارات التواصل العملية في التحدث والكتابة، بالإضافة إلى صقل مهارات الاستماع والقراءة، ومراعاة الدقة في تطبيق قواعد اللغة الإنجليزية، والتدريب على الطلاقة في الحديث.
                                يعمل خبراء اللغة على تكريس الاهتمام الفردي لكل طالب وذلك من خلال الممارسة الفردية المنتظمة، والتي تشتمل على التدريب المٌدمج بالحوار، والتعبير، والمناقشة المفتوحة، بجانب القيام بمحادثات مستنبطة من مواقف حياتية يومية.
                                يتم عمل تقييم لمستوى اللغة الإنجليزية قبل بداية البرنامج لتحديد المستوى المناسب لكل طالب، كما يقوم المعهد بعمل اختبارات التقييم الأسبوعية والشهرية؛ من أجل قياس مستوى تقدم الطلبة.
                                يقوم المعهد بتوفير البرنامج الاجتماعي والتي تتنوع فيها الأنشطة والبرامج الثقافية والرحلات الترفيهية والتعليمية.
                            </p>
                            <h6>تتضمن الدورة</h6>
                            <p>
                                صقل مهارات الاستماع والقراءة.
                                التدريب على الطلاقة في الحديث.
                                مراعاة الدقة في تطبيق قواعد اللغة الإنجليزية.
                                الإلمام بالمفردات الأكثر انتشاراً.
                                الثقة أثناء التحدث باللغة الإنجليزية.
                                التعرف على التعبيرات المتداولة والمستخدمة بشكل يومي.
                                إجراء محادثات مستنبطة من مواقف حياتية يومية</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 '>
                    <div className='price'>
                        <h4>التكاليف</h4>
                        <div className='price-line'>
                            <h6 >حجز الدورة:</h6>
                            <p>80 ر.س</p>
                        </div>
                        <div className='price-line'>
                            <h6 >رسوم الكتب الدراسية:</h6>
                            <p>280 ر.س</p>
                        </div>
                        <div className='price-line'>
                            <h6 >إجمالي السعر:</h6>
                            <p>360 ر.س</p>
                        </div>
                    </div>
                    <div className='booking'>
                        <h4>الحجز و التقديم</h4>
                        <label for='date-selector'>تاريخ البدء:</label>
                        <input id='date-selector' type='date' />
                        <label for='weeks-number'>عدد الاسابيع:</label>
                        <input id='weeks-number' type='number' />
                        <select >
                            <option value="" disabled selected hidden>الدولة</option>
                            <option value="option1">Option 1</option>
                        </select>
                        <h6 >السكن</h6>
                        <button>خيارات السكن المتاحة</button>
                        <label>الاستقبال في المطار:</label>
                    </div>
                </div>
            </div>
        </div>
    </div >
}

 export default CourseDetails;
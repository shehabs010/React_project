import React from 'react';

import initiativeImg1 from '../../assets/img/img-1.png';
import initiativeImg2 from '../../assets/img/img-2.png';
import initiativeImg3 from '../../assets/img/img-3.png';

function Initiative() {
  return (
    <>
      <div className="col-lg-4 col-md-4 mb-5">
        <div className="initiative__goals--item">
          <h6>التسهيل</h6>
          <p>توفر البوابة ما يمكن للطلاب أو الاكاديمين سرعة الوصول الى التخصصات في الكليات السعودية</p>
          <div className="initiative__goals--item_img">
            <img className="img-fluid" src={initiativeImg1} alt="" />
          </div>
        </div>
      </div>
      <div className="col-4 col-md-4 mb-5">
        <div className="initiative__goals--item">
          <h6>التمكين</h6>
          <p>تسعي منصة جامعة لمواكبة رؤية المملكة ٢٠٣٠ وذلك العناية والاهتمام من أجل مستقبل أفضل للوطن</p>
          <div className="initiative__goals--item_img">
            <img className="img-fluid" src={initiativeImg2} alt="" />
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 mb-5">
        <div className="initiative__goals--item">
          <h6>الدليل</h6>
          <p>تغطي البوابة جميع التخصصات الدراسية لتكون الوجهة الأولى والدليل المختصرلسعودية</p>
          <div className="initiative__goals--item_img">
            <img className="img-fluid" src={initiativeImg3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Initiative;

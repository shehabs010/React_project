import React from 'react';

import statisticsImg1 from '../../assets/img/stats1.png';
import statisticsImg2 from '../../assets/img/stats2.png';
import statisticsImg3 from '../../assets/img/stats3.png';
import statisticsImg4 from '../../assets/img/stats4.png';

function Statistics() {
  return (
    <>
      <div className="col-md-3 statistics__item">
        <a href="/">
          <img className="img-fluid" src={statisticsImg1} alt="" />
        </a>
        <div className="statistics-img-title">المجالات الدراسية</div>
      </div>
      <div className="col-md-3 statistics__item">
        <a href="/">
          <img className="img-fluid" src={statisticsImg2} alt="" />
        </a>
        <div className="statistics-img-title">المؤسسات التعليمية</div>
      </div>
      <div className="col-md-3 statistics__item">
        <a href="/">
          <img className="img-fluid" src={statisticsImg3} alt="" />
        </a>
        <div className="statistics-img-title">البرامج الأكاديمية</div>
      </div>
      <div className="col-md-3 statistics__item">
        <a href="/">
          <img className="img-fluid" src={statisticsImg4} alt="" />
        </a>
        <div className="statistics-img-title">الدرجات العلمية</div>
      </div>
    </>
  );
}

export default Statistics;

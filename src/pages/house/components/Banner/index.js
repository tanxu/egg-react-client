import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

export default function(props) {
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  useEffect(() => {

  }, []);

  return (
    <AwesomeSwiper className='banner' config={config}>
      <div className='swiper-wrapper'>
        <div className="swiper-slide">
          <img src={'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg'} alt="" />
        </div>
        <div className="swiper-slide">
          <img src={'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg'} alt="" />
        </div>
        <div className="swiper-slide">
          <img src={'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg'} alt="" />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>
  );
}

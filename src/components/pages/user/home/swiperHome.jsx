// import React from 'react'
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import img from "../../../../assets/img/slid/popular-dish.png";
import img21 from "../../../../assets/img/slid/s21.png";
import img51 from "../../../../assets/img/slid/s51.png";
import img61 from "../../../../assets/img/slid/s61.png";
import img81 from "../../../../assets/img/slid/s81.png";
import img91 from "../../../../assets/img/slid/s91.png";
import img3 from "../../../../assets/img/slid/s3.png";
import img4 from "../../../../assets/img/slid/s4.png";
import img8 from "../../../../assets/img/slid/s8.png";
import img9 from "../../../../assets/img/slid/s9.png";
import img10 from "../../../../assets/img/slid/s44.png";
import img11 from "../../../../assets/img/slid/s511.png";
import img12 from "../../../../assets/img/slid/s102.png";
import img111 from "../../../../assets/img/layout/leaf-branch-1.png";
import img222 from "../../../../assets/img/layout/leaf-branch-2.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
 
function SwiperHome() {
     useEffect(() => {
       // تهيئة AOS
       AOS.init();
     }, []);
  const [activeIndex, setActiveIndex] = useState(1);
  const handleSlideChange = (swiper) => {
    //  setActiveIndex(swiper.activeIndex);
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };
  return (
    <div className="min-h-screen">
      <img src={img222} className="absolute top-[223%] left-[0%] h-28" />
      <img src={img111} className="absolute top-[287%] left-[94%] h-28" />
      <div
        data-aos="zoom-in"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        className=""
      >
        <h1 className="font-Carter flex flex-col items-center justify-center pb-5 text-6xl font-bold">
          Eatery
          <br />
          <span>Royal Taste</span>
        </h1>
        <p className="textColor relative left-[25%] mb-10 w-1/2 text-center">
          Welcomes You Let us take you on a journey through delicious dishes
          where wonderful flavours await you
        </p>
      </div>
      <Swiper
        className="mySwiper relative -left-5"
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        onSlideChange={handleSlideChange}
        loop={true}
        modules={[Pagination, Autoplay]}
      >
        <div className="drop-shadow-[(0 8px 24px hsla(353, 100%, 8%, .2)) ] absolute inset-0 -top-2 left-8 mx-auto w-[270px]">
          <img className="w-[270px]" src={img} />
        </div>
        {[
          img21,
          img12,
          img51,
          img3,
          img61,
          img4,
          img81,
          img9,
          img91,
          img8,
          img11,
          img10,
        ].map((imgSrc, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center pb-10"
          >
            <img
              className={`w-full aspect-square object-contain relative top-[13px] left-4 size-58 transition duration-[.4s] ${
                activeIndex === index ? "" : "scale-[.6] rotate-[-90deg]"
              }`}
              src={imgSrc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperHome;

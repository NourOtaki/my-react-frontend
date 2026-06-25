// import React from 'react'
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import img1 from "../../../../assets/img/contact/1.png";
import img2 from "../../../../assets/img/contact/2 (1).png";
import img3 from "../../../../assets/img/contact/3.png";
import img4 from "../../../../assets/img/contact/4.png";
import img11 from "../../../../assets/img/layout/leaf-branch-1.png"
import img22 from "../../../../assets/img/layout/leaf-branch-2.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function SliderContact() {
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
    <div className="min-h-screen py-28">
      <img src={img22} className="absolute top-[223%] left-[0%] h-28" />
      <img src={img11} className="absolute top-[287%] left-[94%] h-28" />
      <div
        data-aos="zoom-in"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        className="pb-10"
      >
        <h1 className="font-Carter flex flex-col items-center justify-center pb-5 text-6xl font-bold">
          Royal Taste
        </h1>
        <p className="textColor relative left-[25%] mb-10 w-1/2 text-center text-lg">
          We pride ourselves on serving the finest food and beverages carefully
          crafted in our royal factory.
        </p>
      </div>
      <Swiper
        className="mySwiper relative"
        onSlideChange={handleSlideChange}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
      >
        {[img1, img2, img3, img4].map((imgSrc, index) => (
          <SwiperSlide
            key={index}
            className="left-[31%] flex items-center justify-center pb-10 md:left-[44%]"
          >
            <img
              className={`relative top-[15px] transition duration-[.4s]`}
              src={imgSrc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderContact;

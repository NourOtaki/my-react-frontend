// We believe that communication is key to your experience with us. If you have any questions or need assistance, please don't hesitate to contact our team.
import "react";
import Button from "../../../ui/button";
import { Link } from "react-router";
import img1 from "../../../../assets/img/sticker-leaf.svg";
import img2 from "../../../../assets/img/contact/sticker-cheese.svg";
import img4 from "../../../../assets/img/contact/Ilustração_do_conceito_conectado___Vetor_Grátis-removebg-preview.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function HomeContact() {
    useEffect(() => {
      // تهيئة AOS
      AOS.init();
    }, []);
  return (
    <div className="flex min-h-screen flex-col items-start justify-between gap-20 px-16 sm:gap-20 md:flex-row md:gap-0 lg:items-center lg:gap-40 lg:px-32">
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="relative md:top-16 md:w-1/2 lg:-top-18"
      >
        <h1 className="font-Carter text-5xl font-bold md:w-80 lg:w-full xl:text-6xl">
          We're here for you.
        </h1>
        <p className="textColor py-2 text-lg md:py-7 xl:text-xl">
          We believe communication is key to improving your experience with us.
          If you have any questions or need assistance, please don't hesitate to
          contact our team.
        </p>
        <img
          src={img2}
          className="absolute top-20 right-[19%] size-10 rotate-12 opacity-70 lg:right-10 lg:bottom-56"
        ></img>
        <img
          src={img1}
          className="absolute -bottom-8 left-32 size-10 opacity-70 lg:-bottom-4 lg:-left-1 xl:-bottom-10"
        ></img>
      </div>
      <div className="relative w-1/2">
        <div className="relative sm:left-[20%] -left-18 w-[340px] lg:-top-16 xl:w-[480px]">
          <img
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="600"
            src={img4}
            className="drop-shadow-[(0 8px 24px hsla(353, 100%, 8%, .2)) ] relative left-[10%] z-[9] w-[500px] xl:left-0"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default HomeContact;

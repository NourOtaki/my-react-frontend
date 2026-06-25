import Button from "../../../ui/button";
import { Link } from "react-router";
import img4 from "../../../../assets/img/reserve/dream room 🤍 📍.jpg";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ShowTable() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col-reverse items-center  justify-center gap-10 px-4 sm:gap-12 md:flex-row md:gap-16 lg:gap-24 lg:px-20">
      {/* الصورة */}
      <div className="flex w-full justify-center md:w-1/2">
        <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]">
          <img
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="600"
            src={img4}
            className="rounded-2xl drop-shadow-lg lg:w-full xl:size-[450px]"
            alt="Reserve"
          />
        </div>
      </div>
      {/* النص */}
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="w-full text-center md:w-1/2 md:text-left"
      >
        <h1 className="font-Carter text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
          View Restaurant Tables
        </h1>
        <p className="textColor py-3 text-base sm:text-lg md:py-5 lg:text-xl">
          To browse all the table options available at our restaurant
        </p>
        <Link
          to={"showTable"}
          className="text-firstColor inline-block font-semibold hover:underline"
        >
          <Button title="Click here" />
        </Link>
      </div>
    </div>
  );
}

export default ShowTable;

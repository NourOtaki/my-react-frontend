// import "react";
import Button from "../../../ui/button";
import { Link } from "react-router";
import img1 from "../../../../assets/img/sticker-pizza.svg";
import img2 from "../../../../assets/img/sticker-leaf.svg";
import img3 from "../../../../assets/img/home-board.png";
import img4 from "../../../../assets/img/home-pizza.png";
import img5 from "../../../../assets/img/home-tomato.png";
import img6 from "../../../../assets/img/home-leaf-1.png";
import img7 from "../../../../assets/img/home-pepperoni.png";
import img8 from "../../../../assets/img/home-mushroom.png";
import img9 from "../../../../assets/img/home-olive.png";
import img10 from "../../../../assets/img/home-leaf-2.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Home() {
    useEffect(() => {
      // تهيئة AOS
      AOS.init();
    }, []);
  return (
    <div className="flex min-h-screen flex-col items-start justify-between gap-20 px-16 py-32 sm:gap-20 md:flex-row md:gap-0 lg:items-center lg:gap-40 lg:px-32">
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="relative md:top-16 md:w-1/2 lg:-top-2"
      >
        <h1 className="font-Carter text-4xl font-bold md:w-80 lg:w-full lg:text-6xl">
          Tasty and Delicious Foods
        </h1>
        <p className="textColor py-2 md:py-7">
          Our restaurant is a world of delicious flavors! We offer you the most
          delicious dishes and every meal is a special and unforgettable
          experience.
        </p>
        <Link
          to={"/categories"}
          className="text-firstColor font-semibold hover:underline"
        >
          <Button title="show dishes"></Button>
        </Link>
        <img
          src={img1}
          className="absolute -top-9 right-[19%] size-10 rotate-45 opacity-70 lg:right-9 lg:bottom-56"
        ></img>
        <img
          src={img2}
          className="absolute -bottom-8 left-32 size-10 opacity-70 lg:bottom-6 lg:left-56 xl:-bottom-8"
        ></img>
      </div>
      <div className="relative -top-20 w-1/2">
        <div className="relative top-10 grid items-center justify-center sm:left-[20%] md:top-24 md:left-0 md:w-[340px] xl:w-[480px]">
          <img
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="600"
            src={img4}
            className="drop-shadow-[(0 8px 24px hsla(353, 100%, 8%, .2)) ] relative left-[10%] z-[9] w-[350px] xl:-left-1"
          ></img>
          <img
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="500"
            src={img3}
            className="drop-shadow-[(0 8px 24px hsla(353, 100%, 8%, .2)) ] absolute -bottom-2 left-[12%] w-[350px]"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img5}
            className="absolute top-[10%] left-[10%] z-[9] w-9 sm:w-16"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img6}
            className="absolute top-[-8%] left-[50%] z-[9] w-9 sm:left-[49%] sm:w-16"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img7}
            className="absolute top-[12%] right-[-7%] z-[9] w-9 sm:right-[-13%] sm:w-16 xl:right-[11%]"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img8}
            className="absolute right-[-7%] bottom-[8%] z-[9] w-9 sm:right-[-13%] sm:w-16 xl:right-[11%]"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img9}
            className="absolute bottom-[-7%] left-[50%] z-[9] w-9 sm:left-[49%] sm:w-16 xl:left-[40%]"
          ></img>
          <img
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1100"
            src={img10}
            className="absolute bottom-[8%] left-[11%] z-[9] w-9 sm:w-16"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Home;

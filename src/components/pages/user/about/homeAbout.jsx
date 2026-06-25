import React, { useEffect } from 'react'
import AOS from "aos";
function HomeAbout() {
     useEffect(() => {
          // تهيئة AOS
          AOS.init();
        }, []);
  return (
    <div className="flex min-h-screen items-center relative -top-12 justify-center bg-[url('./src/assets/img/about/Home.jpg')] bg-cover opacity-65">
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="w-[500px] rounded-2xl border-2 border-pink-600 bg-pink-50/70 p-10"
      >
        <span className="font-Carter text-5xl text-pink-600">
          In our restaurant
        </span>
        <div className="font-Carter py-4 text-2xl text-pink-600">
          every meal is prepared with love,
          <br></br>
          <span className="relative top-3">
            and every flavor tells a story.
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeAbout

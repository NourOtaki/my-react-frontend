import "react";
import { useState } from "react";
import Card from "../../../ui/card";
import { categories } from "../../../../data/data";
import Navigation from "../../../../lib/navigation/navigation";
function Footer() {
  return (
    <div className="relative mt-8 w-full bg-[url('./src/assets/img/f1.png')] bg-cover pt-9 pb-14 text-white md:mt-0">
      <div className="flex flex-col justify-between p-8 px-5 md:flex-row md:px-32">
        <div className="relative top-5 left-10 w-full md:top-0 md:left-0 md:w-1/4">
          <h1 className="font-Carter pb-2 text-xl font-semibold">
            Royal Taste
          </h1>
          <p className="text-sm">
            indulge in a symphony of flavors, where each plate is a canvas for
            culinary excellence.
          </p>
        </div>
        <div className="relative top-5 left-10 md:top-0 md:left-0">
          <h1 className="font-Carter pt-5 pb-2 text-xl font-medium md:pt-0">
            Links
          </h1>
          <nav className="flex flex-col gap-2">
            {Navigation.map((nav, index) => (
              <a className="cursor-pointer transition-all" href="/">
                {nav.title}
              </a>
            ))}
          </nav>
        </div>
        <div className="relative top-5 left-10 md:top-0 md:left-0">
          <h1 className="font-Carter pt-5 pb-2 text-xl font-medium md:pt-0">
            Menu
          </h1>
          <nav className="flex flex-col gap-2">
            {categories.slice(0, 4).map((data, index) => (
              <a key={index} className="cursor-pointer transition-all">
                {data.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="relative top-5 left-10 md:top-0 md:left-0">
          <h1 className="font-Carter pt-5 pb-2 text-xl font-medium md:pt-0">
            Contact Us
          </h1>
          <nav className="flex flex-col gap-2">
            <a className="cursor-pointer transition-all" href="/">
              RoyalTaste@gmail.com
            </a>
            <a className="cursor-pointer transition-all" href="/">
              +64 958 248 966
            </a>
            <a className="cursor-pointer transition-all" href="/">
              Social media
              <div className="relative  top-76 -left-48 md:top-11 md:left-18 h-[20px] rotate-90">
                <Card />
              </div>
            </a>
          </nav>
        </div>
      </div>
      <div className="">
        <p className="relative top-12 py-4 text-center">
          @copyright developed by
          <span className="text-brightColor"> Nour otaki </span>
          All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;

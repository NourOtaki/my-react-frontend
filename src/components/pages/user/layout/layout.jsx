import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router'
import Footer from './footer'
import img1 from "../../../../assets/img/layout/leaf-branch-1.png"
import img2 from "../../../../assets/img/layout/leaf-branch-2.png";
import img3 from "../../../../assets/img/layout/leaf-branch-3.png";
import img4 from "../../../../assets/img/layout/leaf-branch-4.png";
import ScrollToTop from '../../../ui/scrollToTop'
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="background text-titleColor py-26">
        <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
        <img src={img1} className="absolute top-[75%] left-[94%] h-28" />
        <img
          src={img3}
          className="absolute top-[154%] left-[93%] h-28 -rotate-[25deg]"
        />
        <img
          src={img4}
          className="absolute top-[124%] left-[0%] h-28 rotate-90"
        />
        <Outlet />
      </div>
      <div className="background">
        <Footer />
      </div>
    </>
  );
}

export default Layout

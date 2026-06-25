import React, { useEffect } from "react";
import { useState } from "react";
import img1 from "../../../../assets/img/categories/Cimg1.png";
import img2 from "../../../../assets/img/categories/Cimg2.png";
import img3 from "../../../../assets/img/categories/Cimg3.png";
import img4 from "../../../../assets/img/categories/cimg4.png";
import img5 from "../../../../assets/img/categories/cimg5.jpg";
import img6 from "../../../../assets/img/categories/cing6.png";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Loader from "../../../ui/loader";
// import { categories } from "../../../../data/data";
function HomeCategories() {
  useEffect(() => {
    // تهيئة AOS
    AOS.init();
  }, []);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/showAllCategory",
          );
          setUsers(response.data);
          console.log(users.image);
          console.log("data ", users);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);
    if (loading) return <div className="relative top-10 my-10"><Loader/></div>;
    if (error) return <div>Error: {error}</div>;
  // const [data, setData] = useState(categories);
  return (
    <div className="flex min-h-screen flex-col items-center py-6 md:flex-row md:items-start md:gap-10 md:px-24 lg:gap-20 lg:px-26 xl:px-32">
      <div className="relative grid w-1/2 gap-5 md:gap-12 xl:-left-6 xl:gap-2">
        <div className="flex w-full gap-2 md:mt-7 xl:my-0">
          <div
            data-aos="fade-down"
            data-aos-duration="2400"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="50"
            className="w-1/2"
          >
            <img src={img1} />
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="2400"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="450"
            className="relative top-8 w-1/2"
          >
            <img src={img2} />
          </div>
        </div>
        <div className="flex w-full gap-2 md:-mt-9 xl:my-0">
          <div
            data-aos="fade-down"
            data-aos-duration="2400"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="800"
            className="w-1/3"
          >
            <img src={img3} />
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="2400"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="1600"
            className="w-1/3"
          >
            <img src={img4} />
          </div>
          <div className="flex w-1/3 flex-col">
            <div
              data-aos="fade-down"
              data-aos-duration="1900"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="1800"
              className="h-56"
            >
              <img className="h-[112px] w-full" src={img5} />
            </div>
            <div
              data-aos="fade-down"
              data-aos-duration="2400"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="2400"
              className="relative -top-26 sm:-top-26 sm:left-0"
            >
              <img className="h-[112px] w-full" src={img6} />
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-down"
        data-aos-duration="2400"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="50"
        className="relative w-1/2 lg:top-5 xl:top-0"
      >
        <div className="first-letter:text-firstColor font-Carter relative sm:text-3xl lg:text-4xl xl:text-5xl">
          Exta ordinary taste<p className="pt-2 pb-5">And Experienced</p>
        </div>
        <div className="textColor md:text-sm xl:text-xl">
          We believe that food is more than just a meal; it's an experience that
          brings family and friends together. That's why we've compiled a
          collection of recipes. Here, you'll find everything you need to
          satisfy your food cravings.
        </div>
        <div className="flex gap-4 py-4">
          {users.slice(0, 3).map((data, index) => (
            <div key={index} className="rounded-lg">
              <img
                src={`http://127.0.0.1:8000/storage/${data.image}`}
                className="size-16 rounded"
              />
              <p className="">{data.type}</p>
            </div>
          ))}
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="2900"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="1450"
          className=""
        >
          <div className="border-firstColor bg-containerColor mb-0 flex h-16 w-58 rounded border-0 border-l-7 sm:mb-8">
            <div className="text-firstColor font-Carter px-5 py-3.5 text-3xl">
              30+
            </div>
            <div className="py-2 text-xl">
              Years of <br /> Experienced
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategories;

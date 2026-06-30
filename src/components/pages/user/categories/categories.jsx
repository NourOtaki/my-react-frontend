import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { categories } from "../../../../data/categories";
import img1 from "../../../../assets/img/categories/Cimg1.png";
import imgLine from "../../../../assets/img/Line 9.png";
import Button from "../../../ui/button";
import Loader from "../../../ui/loader";
import Aos from "aos";

function Categories() {
    useEffect(() => {
      // تهيئة AOS
      Aos.init();
    }, []);
  const [users, setUsers] = useState(categories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://127.0.0.1:8000/api/showAllCategory",
  //       );
  //       setUsers(response.data);
  //       console.log(users.image);
  //       console.log("data ", users);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  // if (loading) return <div className="relative top-10 my-10"><Loader/></div>;
  // if (error) return <div>Error: {error}</div>;
  // const [data, setData] = useState(categories);
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="2500"
      data-aos-easing="ease-out-cubic"
      data-aos-delay="100"
      className="relative mb-8 grid gap-y-14 md:px-16 px-[20%] py-8 md:grid-cols-2 md:gap-x-20 lg:px-26 xl:grid-cols-3 xl:gap-x-26"
    >
      {users.map((item, index) => (
        <Link to={`/categories/${item.id}`}>
          <div className="w-full transition duration-[.4s] hover:scale-[1.1]">
            <div key={index} className="relative row-auto flex">
              <div className="bg-containerColor size-42 rounded-[50%] shadow-2xl">
                <img
                  className="relative m-3 h-36 w-36 md:-left-0.5 lg:left-0 rounded-[50%]"
                  // src={img1}
                  src={item.image}
                ></img>
              </div>
              <div className="relative top-10 px-4 md:px-0">
                <p className="font-Carter left-10 mb-5 text-center text-2xl font-bold">
                  {item.type}
                </p>
                <Link
                  to={`/categories/${item.id}`}
                  className="font-semibold hover:underline"
                >
                  <Button className="h-10 w-28" title="Options"></Button>
                </Link>
              </div>
            </div>
            <img className="relative top-7 h-2" src={imgLine} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;

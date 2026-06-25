// // import React from 'react'
// import { NavLink } from "react-router";
// import { Link } from "react-scroll";
// import Button from "../../../ui/button";
// import nav1 from "../../../../assets/img/service-bell-fill (1).png";
// import { BiChevronDown } from "react-icons/bi";
// import { useState } from "react";
// import { categories } from "../../../../data/data";
// import imgNav from "../../../../assets/img/nav.png";
// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "../../../../lib/features/themeSlice"; // Assuming you have the themeSlice set up
// import axios from "axios";
// // import Loader from "../../../ui/loader";
// import { Moon, Sun1 } from "iconsax-reactjs";
// import Logout from "../auth/logout/logout";

// function Navbar() {
//   // const [data, setData] = useState(categories);
//   const [menu, setMenu] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const theme = useSelector((state) => state.theme.mode);
//   const dispatch = useDispatch();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);
  
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/showAllCategory",
//         );
//         setUsers(response.data);
//         console.log(users.image);
//         console.log("data ", users);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const handleChange = () => {
//     setMenu(!menu);
//   };
//   const closeMenu = () => {
//     setMenu(false);
//   };
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(min-width: 768px)");

//     const handleMediaChange = (e) => {
//       if (e.matches) {
//         closeMenu(); // Close menu when screen size is md or larger
//       }
//     };

//     mediaQuery.addEventListener("change", handleMediaChange);

//     // Cleanup listener on component unmount
//     return () => {
//       mediaQuery.removeEventListener("change", handleMediaChange);
//     };
//   }, []);
//   if (error) return <div>Error: {error}</div>;
//   return (
//     <div className="md:bg-opacity-50 bg-bodyColor fixed left-0 z-30 w-full backdrop-blur-md md:bg-transparent">
//       <div className="navbar flex flex-row justify-between px-5 py-4 shadow-[0_3px_10px_rgba(0,0,0,0.2)] lg:px-32">
//         <div className="font-Carter text-titleColor relative flex cursor-pointer flex-row justify-center pt-3 md:left-2 lg:left-1">
//           <span>
//             <img className="relative -top-2 size-10" src={nav1}></img>
//           </span>
//           <h1 className="mx-2 w-full text-xl font-semibold"> Royal Taste</h1>
//         </div>
//         <div className="relative hidden flex-row items-center gap-3 text-lg font-medium md:left-2 md:flex lg:left-0 lg:gap-8">
//           <NavLink
//             to={"/"}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//           >
//             Home
//           </NavLink>
//           <div className="group relative">
//             <div className="flex items-center gap-1">
//               <NavLink
//                 to={"/categories"}
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//               >
//                 Menu
//               </NavLink>
//               <BiChevronDown className="cursor-pointer" size={25} />
//             </div>
//             <ul className="bg-bodyColor text-textColor absolute hidden w-32 space-y-2 rounded border-0 p-5 shadow-2xl group-hover:block">
//               {users.slice(0, 3).map((data, index) => (
//                 <div key={index} className="text-sm">
//                   <NavLink
//                     to={"/categories"}
//                     spy={true}
//                     smooth={true}
//                     duration={500}
//                     className=""
//                   >
//                     {data.type}
//                   </NavLink>
//                 </div>
//               ))}
//             </ul>
//           </div>
//           <NavLink
//             to="/about"
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//           >
//             About
//           </NavLink>

//           <NavLink
//             to={"/contact"}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//           >
//             Contact
//           </NavLink>
//           <div className="relative flex lg:left-10">
//             <NavLink to={"/bill"}>
//               <img className="h-13 w-14" src={imgNav}></img>
//             </NavLink>
//             <NavLink to={"/login"}>
//               <Button className="ms-3" title={"Login"}></Button>
//             </NavLink>
//             <div className="relative lg:w-18" ref={dropdownRef}>
//               <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex w-full cursor-pointer justify-between rounded border-0 p-2 text-xl font-medium select-none xl:text-3xl"
//               >
//                 <i class="ri-corner-down-left-line text-firstColor mx-6 text-2xl"></i>
//               </div>
//               {isOpen && (
//                 <div className="bg-bodyColor absolute top-14 z-10 -my-2 w-full overflow-hidden rounded border-0 shadow-md">
//                   <div
//                     className={`bg-bodyColor text-firstColor w-full cursor-pointer px-3 pt-2 text-xl`}
//                   >
//                     <button
//                       className="relative text-firstColor border-0"
//                       onClick={() => dispatch(toggleTheme())}
//                     >
//                       {theme === "dark" ? (
//                         <Sun1 size="32" />
//                       ) : (
//                         <Moon size="32" />
//                       )}
//                     </button>
//                   </div>
//                   <NavLink
//                     to={"/favorite"}
//                     className={`bg-bodyColor cursor-pointer px-3 py-1 text-xl`}
//                   >
//                     <i class="ri-heart-3-fill text-firstColor text-3xl"></i>
//                   </NavLink>
//                   <div>
//                     <Logout />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="text-titleColor font-Carter flex cursor-pointer items-center md:hidden">
//           {menu ? (
//             <i
//               className="ri-close-large-line text-2xl"
//               size={25}
//               onClick={handleChange}
//             ></i>
//           ) : (
//             <i className="ri-apps-2-fill text-2xl" onClick={handleChange}></i>
//           )}
//         </div>
//       </div>
//       <div
//         className={`${
//           menu ? "translate-x-0" : "-translate-x-full"
//         } bg-bodyColor absolute top-20 left-0 flex h-fit w-full flex-col gap-8 pt-8 pb-4 text-center text-2xl font-semibold text-white shadow-[rgba(353,100%,8%,.1)_0_4px_16px] backdrop-blur-md transition duration-300 md:hidden`}
//       >
//         <NavLink
//           to={"/"}
//           spy={true}
//           smooth={true}
//           duration={500}
//           className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to={"/categories"}
//           spy={true}
//           smooth={true}
//           duration={500}
//           className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//         >
//           Menu
//         </NavLink>
//         <NavLink
//           to="/about"
//           spy={true}
//           smooth={true}
//           duration={500}
//           className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//         >
//           About
//         </NavLink>
//         <NavLink
//           to={"/contact"}
//           spy={true}
//           smooth={true}
//           duration={500}
//           className="text-titleColor font-Carter cursor-pointer transition-all hover:text-red-600"
//         >
//           Contact
//         </NavLink>
//         <div className="flex justify-center">
//           <NavLink to={"/bill"}>
//             <img className="mr-3 h-13 w-14" src={imgNav}></img>
//           </NavLink>
//           <NavLink to={"/login"}>
//             <Button title={"Login"}></Button>
//           </NavLink>
//           <button
//             className="relative text-firstColor pe-2 -top-1 border-0"
//             onClick={() => dispatch(toggleTheme())}
//           >
//             {theme === "dark" ? <Sun1 size="32" /> : <Moon size="32" />}
//           </button>
//           <i class="ri-heart-3-line text-firstColor text-4xl"></i>
//           <div>
//             <Logout />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
import { NavLink } from "react-router";
import { Link } from "react-scroll";
import Button from "../../../ui/button";
import nav1 from "../../../../assets/img/service-bell-fill (1).png";
import { BiChevronDown } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { categories } from "../../../../data/data";
import imgNav from "../../../../assets/img/nav.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../../lib/features/themeSlice";
import axios from "axios";
import { Moon, Sun1 } from "iconsax-reactjs";
import Logout from "../auth/logout/logout";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // 👇 اسم المستخدم
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/showAllCategory",
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e) => {
      if (e.matches) closeMenu();
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="md:bg-opacity-50 bg-bodyColor fixed left-0 z-30 w-full backdrop-blur-md md:bg-transparent">
      <div className="navbar flex flex-row justify-between px-5 py-4 shadow-[0_3px_10px_rgba(0,0,0,0.2)] lg:px-32">
        {/* Logo */}
        <div className="font-Carter text-titleColor relative flex cursor-pointer flex-row justify-center pt-3 md:left-2 lg:left-1">
          <span>
            <img className="relative -top-2 size-10" src={nav1}></img>
          </span>
          <h1 className="mx-2 w-full text-xl font-semibold"> Royal Taste</h1>
        </div>

        {/* Links */}
        <div className="relative hidden flex-row items-center gap-3 text-lg font-medium md:left-2 md:flex lg:left-0 lg:gap-8">
          <NavLink
            to={"/"}
            className="text-titleColor font-Carter hover:text-red-600"
          >
            Home
          </NavLink>

          <div className="group relative">
            <div className="flex items-center gap-1">
              <NavLink
                to={"/categories"}
                className="text-titleColor font-Carter hover:text-red-600"
              >
                Menu
              </NavLink>
              <BiChevronDown size={25} />
            </div>
            <ul className="bg-bodyColor text-textColor absolute hidden w-32 space-y-2 rounded p-5 shadow-2xl group-hover:block">
              {users.slice(0, 3).map((data, index) => (
                <div key={index} className="text-sm">
                  <NavLink to={"/categories"}>{data.type}</NavLink>
                </div>
              ))}
            </ul>
          </div>

          <NavLink
            to="/about"
            className="text-titleColor font-Carter hover:text-red-600"
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className="text-titleColor font-Carter hover:text-red-600"
          >
            Contact
          </NavLink>

          <div className="relative flex lg:left-10">
            <NavLink to={"/bill"}>
              <img className="h-13 w-14" src={imgNav}></img>
            </NavLink>

            {username ? (
              <NavLink to={"/login"}>
                <Button className="ms-3" title={username}></Button>
              </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <Button className="ms-3" title={"Login"}></Button>
              </NavLink>
            )}

            <div className="relative lg:w-18" ref={dropdownRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer justify-between rounded p-2 text-xl font-medium select-none xl:text-3xl"
              >
                <i className="ri-corner-down-left-line text-firstColor mx-6 text-2xl"></i>
              </div>
              {isOpen && (
                <div className="bg-bodyColor absolute top-14 z-10 -my-2 w-full overflow-hidden rounded shadow-md">
                  <div className="bg-bodyColor text-firstColor w-full px-3 pt-2 text-xl">
                    <button onClick={() => dispatch(toggleTheme())}>
                      {theme === "dark" ? (
                        <Sun1 size="32" />
                      ) : (
                        <Moon size="32" />
                      )}
                    </button>
                  </div>
                  <NavLink
                    to={"/favorite"}
                    className="bg-bodyColor px-3 py-1 text-xl"
                  >
                    <i className="ri-heart-3-fill text-firstColor text-3xl"></i>
                  </NavLink>
                  <div>
                    <Logout />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="text-titleColor font-Carter flex cursor-pointer items-center md:hidden">
          {menu ? (
            <i
              className="ri-close-large-line text-2xl"
              onClick={handleChange}
            ></i>
          ) : (
            <i className="ri-apps-2-fill text-2xl" onClick={handleChange}></i>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className={`${
          menu ? "translate-x-0" : "-translate-x-full"
        } bg-bodyColor absolute top-20 left-0 flex h-fit w-full flex-col gap-8 pt-8 pb-4 text-center text-2xl font-semibold text-white shadow-md backdrop-blur-md transition duration-300 md:hidden`}
      >
        <NavLink
          to={"/"}
          className="text-titleColor font-Carter hover:text-red-600"
        >
          Home
        </NavLink>
        <NavLink
          to={"/categories"}
          className="text-titleColor font-Carter hover:text-red-600"
        >
          Menu
        </NavLink>
        <NavLink
          to="/about"
          className="text-titleColor font-Carter hover:text-red-600"
        >
          About
        </NavLink>
        <NavLink
          to={"/contact"}
          className="text-titleColor font-Carter hover:text-red-600"
        >
          Contact
        </NavLink>

        <div className="flex relative left-10 justify-center">
          <NavLink to={"/bill"}>
            <img className=" h-13 w-14" src={imgNav}></img>
          </NavLink>

          {username ? (
            <NavLink to={"/login"}>
              <Button className="ms-3" title={username}></Button>
            </NavLink>
          ) : (
            <NavLink to={"/login"}>
              <Button title={"Login"}></Button>
            </NavLink>
          )}
          <button
            className="text-firstColor mx-3 relative -top-1 pe-2"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "dark" ? <Sun1 size="32" /> : <Moon size="32" />}
          </button>
          <i className="ri-heart-3-line text-firstColor text-4xl"></i>
          <div>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

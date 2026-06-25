
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import nav1 from "../../../../assets/img/service-bell-fill (1).png";
import Button from "../../../ui/button";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineTable,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

function Sidebar() {
  const [menu, setMenu] = useState(false); // للتحكم بظهور السايدبار بالموبايل
  const [collapsed, setCollapsed] = useState(true); // افتراضيًا مسكر
  const [username, setUsername] = useState(null); // 👈 اسم المستخدم

  const toggleMenu = () => setMenu(!menu);
  const toggleCollapse = () => setCollapsed(!collapsed);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e) => {
      if (e.matches) {
        setMenu(true); // على الديسكتوب دائمًا ظاهر
      } else {
        setMenu(false); // على الموبايل يفتح بالزر فقط
      }
    };
    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // 👇 جلب اسم المستخدم من localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name);
    }
  }, []);

  return (
    <>
      {/* زر الموبايل */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={toggleMenu} className="text-titleColor text-2xl">
          {menu ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* السايدبار */}
      <div
        className={`bg-bodyColor fixed top-0 left-0 z-40 h-full transform shadow-lg transition-all duration-300 ${
          collapsed ? "w-12" : "w-64"
        } ${menu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* زر التصغير */}
        <div className="flex justify-end p-2 md:block">
          <button
            onClick={toggleCollapse}
            className="text-xl hover:text-red-500"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {/* شعار */}
        <div
          className={`flex items-center gap-2 p-4 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <img src={nav1} className="h-7 w-7" />
          {!collapsed && <h1 className="text-xl font-semibold">Royal Taste</h1>}
        </div>

        {/* روابط السايدبار */}
        <nav className="mt-5 flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-red-600"
          >
            <AiOutlineHome className="text-lg" />
            {!collapsed && <span>Home</span>}
          </NavLink>

          <NavLink
            to="categoriesDash"
            className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-red-600"
          >
            <AiOutlineAppstore className="text-lg" />
            {!collapsed && <span>Menu Management</span>}
          </NavLink>

          <NavLink
            to="createTable"
            className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-red-600"
          >
            <AiOutlineTable className="text-lg" />
            {!collapsed && <span>Table</span>}
          </NavLink>

          <NavLink
            to="orders"
            className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-red-600"
          >
            <AiOutlineShopping className="text-lg" />
            {!collapsed && <span>Orders</span>}
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-red-600"
          >
            <AiOutlineLogin className="relative text-lg" />
            {!collapsed &&
              (username ? (
                <Button title={username} />
              ) : (
                <Button title="Login" />
              ))}
          </NavLink>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

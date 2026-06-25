import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import TextField from "../../../ui/form/textField";
import * as Yup from "yup";
import Button from "../../../ui/button";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import img1 from "../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../assets/img/layout/leaf-branch-2.png";
import { useLoginMutation } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/lib/features/authSlice"; // تأكد من أن المسار صحيح

function loginDash() {
  useEffect(() => {
    // تهيئة AOS
    AOS.init();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DloginDash, { isLoading }] = useLoginMutation();
  return (
    <div className="background flex min-h-screen items-center justify-center align-middle">
      <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
      <img src={img1} className="absolute top-[75%] left-[94%] h-28" />
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="border-firstColor relative left-0 mt-8 h-[450px] w-[750px] overflow-hidden border-2 px-10 py-0 shadow-[0_0_25px_#FF0000]"
      >
        <div className="from-bodyColor to-firstColor absolute -top-1.5 right-0 h-[600px] w-[850px] origin-bottom-right rotate-[10deg] skew-y-[40deg] bg-gradient-to-r"></div>
        <div className="absolute top-0 flex h-full w-[50%] flex-col justify-center">
          <h2 className="font-Carter text-textColor text-[35px] font-semibold">
            Login
          </h2>
          <div className="flex w-screen flex-row gap-36">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={() => {
                return Yup.object({
                  email: Yup.string()
                    .required(`"enter your email."`)
                    .email(`Please include the @ symbol.`),
                  password: Yup.string()
                    .min(5, `"Please use a longer password."`)
                    .required(`"Please fill out this form."`),
                });
              }}
              onSubmit={async (values) => {
                try {
                  const response = await login(values).unwrap(); // نفذ طلب تسجيل الدخول

                  localStorage.setItem("TOKEN", response.Token); // خزّن التوكن
                  console.log("token", response.Token);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      name: response.email,
                      email: response.password,
                      userID: response.user.id,
                      role: response.user.role,
                    }),
                  );

                  dispatch(
                    setUser({
                      name: response.email,
                      email: response.password,
                      userID: response.user.id,
                      role: response.user.role,
                    }),
                  );
                  navigate("/dashboard");
                  // dispatch(setUser(response.user)); // خزّن بيانات المستخدم في Redux

                  alert("تم تسجيل الدخول بنجاح");
                } catch (error) {
                  alert("فشل تسجيل الدخول");
                  console.error(error);
                }
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="text-textColor">
                    <TextField
                      type="email"
                      name="email"
                      icon="ri-mail-add-fill"
                    />
                    {touched.email && errors.email && (
                      <p className="text-firstColor">{errors.email}</p>
                    )}
                    <TextField
                      type="password"
                      name="password"
                      icon="ri-lock-2-fill"
                    />
                    {touched.password && errors.password && (
                      <p className="text-firstColor">{errors.password}</p>
                    )}
                    <div className="">
                      <Button
                        title={isLoading ? "Logging in..." : "Login"}
                        disabled={isLoading}
                        type="submit"
                        className="border-firstColor from-bodyColor to-firstColor relative mt-6 h-12 w-full cursor-pointer border-2 bg-gradient-to-t text-[16px] font-semibold"
                      />
                    </div>
                    <div className="mt-5 mb-2.5 text-center text-[14px]">
                      <p>
                        Don,t have an account ?
                        <Link
                          to={"/register"}
                          className="text-firstColor font-semibold hover:underline"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className="px-2 text-white">
              <h2 className="font-Carter text-[35px] font-semibold uppercase">
                Welcome back!
              </h2>
              <p className="relative left-10 w-[40%] text-[16px]">
                You are part of our story, Let's start our new adventure in the
                world of royal taste
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginDash;

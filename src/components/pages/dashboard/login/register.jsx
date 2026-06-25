// import React from "react";
import axios from "axios";
import { Form, Formik } from "formik";
// import Username from "../../../../ui/form/username";
// import Password from "../../../../ui/form/password";
import * as Yup from "yup";
import Button from "../../../../ui/button";
import img1 from "../../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../../assets/img/layout/leaf-branch-2.png";
import { Link } from "react-router";
// import Email from "../../../../ui/form/email";
// import ConfirmPassword from "../../../../ui/form/confirm";
import TextField from "../../../../ui/form/textField";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRegisterMutation } from "@/services/authApi";

function Register() {
  useEffect(() => {
    // تهيئة AOS
    AOS.init();
  }, []);

//  const handleRegister =  async (values) => {
//   const { username, email, password, confirmPassword } = values;
//     if (password !== confirmPassword) {
//       alert("كلمتا المرور غير متطابقتين!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/register",
//         {
//           name:username,
//           email,
//           password,
//           password_confirmation:confirmPassword,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       alert("تم التسجيل بنجاح!");
//     } catch (err) {
//       console.error(err);
//       console.log(err.response?.data);
//       alert("فشل في التسجيل");
//     }
//   };
  const [Register, { isLoading }] = useRegisterMutation();

  return (
    <div className="background flex min-h-screen items-center justify-center align-middle">
      <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
      <img src={img1} className="absolute top-[75%] left-[94%] h-28" />
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="border-firstColor relative left-0 mt-8 h-[450px] w-[750px] overflow-hidden border-2 px-10 py-0 shadow-[0_0_25px_#FF0000] dark:shadow-[0_0_25px_#000000]"
      >
        <div className="to-bodyColor from-firstColor absolute -bottom-36 left-0 h-[700px] w-[850px] origin-bottom-left rotate-[-10deg] skew-y-[-40deg] bg-gradient-to-r"></div>
        <div className="absolute top-0 flex h-full w-[50%] flex-col justify-center">
          <div className="flex w-screen flex-row gap-28">
            <div className="relative top-20 w-1/5 text-white">
              <h2 className="font-Carter mb-2 text-[32px] font-semibold uppercase">
                The restaurant
                <p className="text-3xl">welcomes you</p>
              </h2>
              <p className="relative text-[16px]">
                You are part of our story, Let's start our new adventure in the
                world of royal taste
              </p>
            </div>
            <div className="w-1/5">
              <h2 className="font-Carter text-textColor relative top-5 left-20 text-[35px] font-semibold">
                Register
              </h2>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  email: "",
                  confirmPassword: "",
                }}
                // onSubmit={handleRegister}
                validationSchema={() => {
                  return Yup.object({
                    username: Yup.string().required(
                      `"Please fill out this form."`,
                    ),
                    email: Yup.string()
                      .required(`"enter your email."`)
                      .email(`Please include the @ symbol.`),
                    password: Yup.string()
                      .required(`"Please fill out this form."`)
                      .min(5, `"Please use a longer password."`),
                    confirmPassword: Yup.string()
                      .oneOf(
                        [Yup.ref("password")],
                        `"Password does not match."`,
                      )
                      .required(`"Please confirm your password"`),
                  });
                }}
          
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const result = await Register({
                      name: values.username,
                      email: values.email,
                      password: values.password,
                      password_confirmation:values.confirmPassword,
                    });
                    if ("error" in result) {
                      console.error("خطأ من السيرفر:", result.error);
                      alert(
                        "فشل التسجيل: " +
                          JSON.stringify(result.error.data || result.error),
                      );
                    } else {
                      alert("تم التسجيل بنجاح");
                      resetForm();
                    }
                  } catch (error) {
                    console.error("🔥 استثناء في التسجيل:", error);
                    if (error?.data) {
                      console.log("📦 رسالة من السيرفر:", error.data);
                    }
                    alert("حدث خطأ أثناء التسجيل");
                  }

                }}

             
              >
                {({ errors, touched }) => {
                  return (
                    <Form className="text-textColor relative top-3">
                      <TextField
                        type="username"
                        name="username"
                        icon="ri-user-fill"
                      />
                      {touched.username && errors.username && (
                        <p className="text-firstColor text-xs">
                          {errors.username}
                        </p>
                      )}
                      <TextField
                        type="email"
                        name="email"
                        icon="ri-mail-add-fill"
                      />
                      {touched.email && errors.email && (
                        <p className="text-firstColor text-xs">
                          {errors.email}
                        </p>
                      )}
                      <TextField
                        type="password"
                        name="password"
                        icon="ri-lock-2-fill"
                      />
                      {touched.password && errors.password && (
                        <p className="text-firstColor text-xs">
                          {errors.password}
                        </p>
                      )}
                      <TextField
                        type="password"
                        name="confirmPassword"
                        icon="ri-lock-2-fill"
                      />
                      <p className="text-firstColor text-xs">
                        {touched.confirmPassword && errors.confirmPassword && (
                          <p className="text-firstColor text-xs">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </p>
                      <div className="">
                        <Button
                          title={isLoading ? "Logging in..." : "Register"}
                          disabled={isLoading}
                          type="submit"
                          className="border-firstColor from-bodyColor to-firstColor relative mt-3 h-12 w-full cursor-pointer border-2 bg-gradient-to-t text-[16px] font-semibold"
                        />
                      </div>
                      <div className="mt-1 mb-2.5 text-center text-[14px]">
                        <p>
                          Don have an account ?
                          <Link
                            to={"/login"}
                            className="text-firstColor font-semibold hover:underline"
                          >
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

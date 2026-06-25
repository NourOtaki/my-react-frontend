
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import TextField from "../../../../ui/form/textField";
import * as Yup from "yup";
import Button from "../../../../ui/button";
import img1 from "../../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../../assets/img/layout/leaf-branch-2.png";
import { Link, useNavigate } from "react-router"; // <-- useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import { useRegisterMutation } from "@/services/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate(); // <-- هنا
  useEffect(() => {
    AOS.init();
  }, []);

  const [Register, { isLoading }] = useRegisterMutation();

  return (
    <div className="background flex min-h-screen items-center justify-center px-4">
      <img
        src={img2}
        className="absolute top-[15%] left-[0%] hidden h-20 md:block md:h-28"
      />
      <img
        src={img1}
        className="absolute top-[75%] left-[94%] hidden h-20 md:block md:h-28"
      />

      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="border-firstColor relative left-0 mt-8 h-auto w-full max-w-[750px] overflow-hidden rounded-md border-2 px-4 py-6 shadow-[0_0_25px_#FF0000] md:px-10 dark:shadow-[0_0_25px_#000000]"
      >
        <div className="to-bodyColor from-firstColor absolute -bottom-36 left-0 hidden h-[700px] w-[850px] origin-bottom-left rotate-[-10deg] skew-y-[-40deg] bg-gradient-to-r md:block"></div>

        <div className="relative flex h-full w-full flex-col justify-center md:flex-row md:gap-10">
          <div className="relative top-15 mb-6 hidden w-full text-white md:mb-0 md:block">
            <h2 className="font-Carter mb-2 text-2xl font-semibold uppercase md:text-[32px]">
              The restaurant
              <p className="text-xl md:text-3xl">welcomes you</p>
            </h2>
            <p className="text-sm md:text-[16px]">
              You are part of our story, <br />
              Let's start our new adventure <br />
              in the world of royal taste
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="font-Carter text-textColor mb-4 text-center text-2xl font-semibold md:text-left md:text-[35px]">
              Register
            </h2>
            <Formik
              initialValues={{
                username: "",
                password: "",
                email: "",
                confirmPassword: "",
              }}
              validationSchema={() => {
                return Yup.object({
                  username: Yup.string().required("Please fill out this form."),
                  email: Yup.string()
                    .required("Enter your email.")
                    .email("Please include the @ symbol."),
                  password: Yup.string()
                    .required("Please fill out this form.")
                    .min(5, "Please use a longer password."),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password")], "Password does not match.")
                    .required("Please confirm your password"),
                });
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const result = await Register({
                    name: values.username,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.confirmPassword,
                  });

                  if ("error" in result) {
                    const errMsg =
                      result.error?.data?.message ||
                      JSON.stringify(result.error);
                    toast.error("فشل التسجيل: " + errMsg);
                  } else {
                    const successMsg =
                      result.data?.message || "تم التسجيل بنجاح";
                    toast.success(successMsg);

                    resetForm();

                    // إعادة التوجيه بعد 2 ثانية
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  }
                } catch (error) {
                  console.error("🔥 استثناء في التسجيل:", error);
                  const errMsg =
                    error?.data?.message || "حدث خطأ أثناء التسجيل";
                  toast.error(errMsg);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="text-textColor">
                  <TextField
                    type="username"
                    name="username"
                    icon="ri-user-fill"
                  />
                  {touched.username && errors.username && (
                    <p className="text-firstColor text-xs">{errors.username}</p>
                  )}

                  <TextField
                    type="email"
                    name="email"
                    icon="ri-mail-add-fill"
                  />
                  {touched.email && errors.email && (
                    <p className="text-firstColor text-xs">{errors.email}</p>
                  )}

                  <TextField type="password" name="password" />
                  {touched.password && errors.password && (
                    <p className="text-firstColor text-xs">{errors.password}</p>
                  )}

                  <TextField type="password" name="confirmPassword" />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-firstColor text-xs">
                      {errors.confirmPassword}
                    </p>
                  )}

                  <div>
                    <Button
                      title={isLoading ? "Registering..." : "Register"}
                      disabled={isLoading}
                      type="submit"
                      className="border-firstColor from-bodyColor to-firstColor relative mt-3 h-12 w-full cursor-pointer border-2 bg-gradient-to-t text-[16px] font-semibold"
                    />
                  </div>

                  <div className="mt-2 text-center text-[14px]">
                    <p>
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="text-firstColor font-semibold hover:underline"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Register;

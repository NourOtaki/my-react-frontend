
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import TextField from "../../../../ui/form/textField";
import * as Yup from "yup";
import Button from "../../../../ui/button";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import img1 from "../../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../../assets/img/layout/leaf-branch-2.png";
import { useLoginMutation } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/authSlice";

// مكتبة التوست
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  useEffect(() => {
    AOS.init();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  return (
    <div className="background flex min-h-screen items-center justify-center px-4">
      {/* صور الخلفية */}
      <img
        src={img2}
        className="absolute top-[15%] left-[0%] hidden h-20 md:block md:h-28"
      />
      <img
        src={img1}
        className="absolute  top-[75%] left-[94%] hidden h-20 md:block md:h-28"
      />

      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="border-firstColor relative mt-8 h-auto w-full max-w-[750px] overflow-hidden rounded-md border-2 px-4 py-6 shadow-[0_0_25px_#FF0000] md:px-10"
      >
        {/* الخلفية المائلة */}
        <div className="from-bodyColor to-firstColor absolute -top-1.5 right-0 hidden h-[600px] w-[850px] origin-bottom-right rotate-[10deg] skew-y-[40deg] bg-gradient-to-r md:block"></div>

        <div className="relative flex h-[360px] w-full flex-col justify-center md:flex-row md:gap-6">
          {/* الفورم */}
          <div className="relative md:top-10 w-full md:w-1/2">
            <h2 className="font-Carter text-textColor mb-4 text-center text-2xl font-semibold md:text-left md:text-[35px]">
              Login
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={() =>
                Yup.object({
                  email: Yup.string()
                    .required("Enter your email.")
                    .email("Please include the @ symbol."),
                  password: Yup.string()
                    .min(5, "Please use a longer password.")
                    .required("Please fill out this form."),
                })
              }
              onSubmit={async (values) => {
                try {
                  const response = await login(values).unwrap();

                  // حفظ التوكن وبيانات المستخدم
                  localStorage.setItem("TOKEN", response.Token);
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      name: response.user.name || response.user.email,
                      email: response.user.email,
                      userID: response.user.id,
                      role: response.user.role,
                    }),
                  );

                  dispatch(
                    setUser({
                      name: response.user.name || response.user.email,
                      email: response.user.email,
                      userID: response.user.id,
                      role: response.user.role,
                    }),
                  );

                  // عرض رسالة نجاح
                  toast.success(response.message || "تم تسجيل الدخول بنجاح");

                  // الانتظار قبل التنقل للسماح بعرض التوست
                  setTimeout(() => {
                    if (response.user.role === "admin") {
                      navigate("/dashboard");
                    } else {
                      navigate("/");
                    }
                  }, 1500); // 1.5 ثانية
                } catch (error) {
                  // عرض رسالة الخطأ
                  const errMsg = error?.data?.message || "فشل تسجيل الدخول";
                  toast.error(errMsg);
                  console.error(error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="text-textColor md:w-3/4">
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
                  <div>
                    <Button
                      title={isLoading ? "Logging in..." : "Login"}
                      disabled={isLoading}
                      type="submit"
                      className="border-firstColor from-bodyColor to-firstColor relative mt-6 h-12 w-full cursor-pointer border-2 bg-gradient-to-t text-[16px] font-semibold"
                    />
                  </div>

                  <div className="mt-5 mb-2.5 text-center text-[14px]">
                    <p>
                      Don’t have an account ?{" "}
                      <Link
                        to={"/register"}
                        className="text-firstColor font-semibold hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* النص الجانبي */}
          <div className="relative top-14 left-10 hidden w-full px-2 text-white md:block md:w-1/2">
            <h2 className="font-Carter mb-2 text-[35px] font-semibold uppercase">
              Welcome back!
            </h2>
            <p className="text-[16px]">
              You are part of our story, Let's start our new adventure in the
              world of royal taste
            </p>
          </div>
        </div>
      </div>

      {/* مكان عرض التوست */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Login;

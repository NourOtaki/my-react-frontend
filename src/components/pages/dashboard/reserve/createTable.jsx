

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import imag2 from "../../../../assets/img/reserve/c438ea6dc8c0a47315ec2812c3033b8a (1).jpg";
import imag3 from "../../../../assets/img/reserve/39979552aa0a347705d6313e25df90b6.jpg";
import TextField from "../../../ui/form/textField";
import Button from "../../../ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "aos/dist/aos.css";

function CreateTable() {
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user) {
      toast.error("Please log in first.");
      return;
    }
// jhdjokmomd..lll;j,,,l;.,x..x.s.
    try {
      const token = localStorage.getItem("TOKEN");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/tables",
        {
          capacity: values.capacity,
          price: values.price,
          status: "available", // ثابت
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // عرض رسالة النجاح كما يرسلها الباك
      if (response?.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.success("Table provided successfully!");
      }

      resetForm();

      // تأخير قبل إعادة التحميل
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error) {
      console.error("Failed to provide table:", error);

      // عرض رسالة الخطأ من الباك كما هي
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "An unexpected error occurred.";
      toast.error(message);
    }
  };

  return (
    <div className="relative -top-10 mx-8 flex min-h-screen flex-col items-center justify-center">
      {/* Side Image Top */}
      <img
        className="absolute top-20 left-5 z-20 hidden w-20 rounded-2xl md:w-28 lg:block lg:size-30 xl:left-42 xl:size-32"
        src={imag2}
        alt=""
      />

      {/* Form Container */}
      <div className="relative left-6 z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:max-w-2xl lg:left-0 lg:max-w-4xl">
        <h1 className="font-Carter text-textColor mb-6 text-center text-2xl font-semibold md:text-3xl">
          Provide a table
        </h1>
        <Formik
          initialValues={{
            capacity: "",
            price: "",
          }}
          validationSchema={Yup.object({
            capacity: Yup.number()
              .nullable()
              .transform((value, originalValue) =>
                String(originalValue).trim() === ""
                  ? null
                  : Number(originalValue),
              )
              .typeError("Capacity must be a number")
              .required("Please provide capacity")
              .min(1, "Capacity must be at least 1"),
            price: Yup.number()
              .nullable()
              .transform((value, originalValue) =>
                String(originalValue).trim() === ""
                  ? null
                  : Number(originalValue),
              )
              .typeError("Price must be a number")
              .required("Please provide price")
              .min(1, "Price must be at least 1"),
          })}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-5">
              {/* Capacity */}
              <div>
                <TextField
                  type="number"
                  name="capacity"
                  icon="ri-group-line"
                  min="1"
                  value={values.capacity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) >= 1) {
                      setFieldValue("capacity", val === "" ? "" : Number(val));
                    }
                  }}
                />
                <ErrorMessage
                  name="capacity"
                  component="p"
                  className="text-firstColor text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <TextField
                  type="number"
                  name="price"
                  icon="ri-money-dollar-circle-line"
                  min="1"
                  value={values.price}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) >= 1) {
                      setFieldValue("price", val === "" ? "" : Number(val));
                    }
                  }}
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-firstColor text-sm"
                />
              </div>

              <div className="flex justify-center">
                <Button title="Provide" className="mt-3" />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Side Image Bottom */}
      <img
        className="absolute right-5 bottom-20 z-10 hidden w-20 rounded-2xl md:w-28 lg:block lg:size-30 xl:right-42 xl:size-32"
        src={imag3}
        alt=""
      />

      {/* Toaster */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default CreateTable;


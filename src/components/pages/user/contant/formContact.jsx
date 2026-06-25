import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../ui/form/textField";
import * as Yup from "yup";
import Button from "../../../ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAddPostMutation } from "@/services/contactApi";
function FormContact() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const user = useSelector((state) => state.auth.user);
  // const userId = user.userID;
  console.log("user:", user);
  const userId = user?.userID ?? null;
  const [addPost, {}] = useAddPostMutation();
  const handleSubmit = async (values) => {
    if (!user) {
      alert("يرجى تسجيل الدخول أولاً.");
      return;
    }

    try {
      const response = await addPost({
        stars: rating,
        comment: values.comment,
        user_id: userId,
      });

      alert("تم إرسال التقييم بنجاح!");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("فشل في إرسال التقييم:", error);
      alert("حدث خطأ أثناء إرسال التقييم.");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center align-middle">
      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
        className="border-firstColor relative left-0 mt-8 h-[450px] w-[750px] overflow-hidden border-2 px-10 py-0 shadow-[0_0_25px_#FF0000]"
      >
        <div className="from-bodyColor to-firstColor absolute -top-1.5 right-0 h-[600px] w-[850px] origin-bottom-right rotate-[10deg] skew-y-[40deg] bg-gradient-to-r"></div>
        <div className="absolute top-0 flex h-full w-[50%] flex-col justify-center">
          <h2 className="font-Carter text-[35px] font-semibold">
            Post a comment
          </h2>
          <div className="flex w-screen flex-row gap-36">
            <Formik
              initialValues={{ comment: "" }}
              validationSchema={Yup.object({
                comment: Yup.string().required("Please fill out this form."),
              })}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form>
                  <div className="mb-4 flex flex-row-reverse justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="text-4xl transition-colors focus:outline-none"
                      >
                        <span
                          className={
                            star <= (hover || rating)
                              ? "text-firstColor"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>

                  <TextField
                    type="text"
                    name="comment"
                    icon="ri-sticky-note-add-fill"
                  />
                  {errors.comment && (
                    <p className="text-firstColor">{errors.comment}</p>
                  )}

                  <div>
                    <Button
                      title="Post a comment"
                      type="submit"
                      className="border-firstColor from-bodyColor to-firstColor relative mt-6 h-12 w-full cursor-pointer border-2 bg-gradient-to-t text-[16px] font-semibold"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            <div className="relative -top-4 px-2 text-white">
              <h2 className="font-Carter relative left-17 text-[35px] font-semibold uppercase">
                Welcome!
              </h2>
              <p className="relative left-14 w-[40%] text-[16px]">
                You are part of our story, let us hear your review of Royal
                Taste Restaurant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormContact;

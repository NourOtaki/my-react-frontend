// import React, { useEffect, useState } from "react";
// import Button from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogPortal,
//   DialogTrigger,
//   DialogOverlay,
// } from "@radix-ui/react-dialog";
// import axios from "axios";
// import { Formik, Form, Field } from "formik";

// export function DialogDemo({
//   trigger,
//   fields = [],
//   postUrlAdd,
//   putUrlUpdate,
//   editMode = false,
//   initialData = {},
//   fetchDataFromParent, // دالة الأب لتحديث البيانات
// }) {
//   const token = localStorage.getItem("TOKEN");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [open, setOpen] = useState(false);

//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   useEffect(() => {
//     if (editMode && initialData?.image) {
//       setPreviewImage(`http://127.0.0.1:8000/storage/${initialData.image}`);
//     }
//   }, [editMode, initialData]);

//   const handleFileChange = (e, setFieldValue) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setFieldValue("image", file);
//     }
//   };

//   const initialValues = fields.reduce((acc, field) => {
//     acc[field] = initialData?.[field] || "";
//     return acc;
//   }, {});

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const dataToSend = new FormData();
//       for (const key in values) {
//         if (key !== "id" && key !== "image") {
//           dataToSend.append(key, values[key]);
//         }
//       }

//       if (selectedFile) {
//         dataToSend.append("image", selectedFile);
//       } else if (initialData?.image && editMode) {
//         dataToSend.append("existingImage", initialData.image);
//       }

//       const url = editMode && putUrlUpdate ? putUrlUpdate : postUrlAdd;

//       const response = await axios({
//         method: "post",
//         url,
//         data: dataToSend,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("تم الإرسال:", response.data);
//       resetForm();
//       if (fetchDataFromParent) fetchDataFromParent(); // تحديث الأب مباشرة
//       setOpen(false);
//     } catch (error) {
//       console.error("فشل العملية:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <div onClick={() => setOpen(true)}>{trigger}</div>
//       </DialogTrigger>

//       <DialogPortal>
//         <DialogOverlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
//         <DialogContent className="bg-bodyColor fixed top-1/2 left-1/2 z-50 max-h-[90vh] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 shadow-2xl sm:max-w-md md:max-w-lg md:p-16 lg:w-full">
//           <button
//             onClick={() => setOpen(false)}
//             className="absolute top-4 right-4 text-xl font-bold"
//           >
//             ❌
//           </button>

//           <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             {({ setFieldValue }) => (
//               <Form className="w-full">
//                 <div className="grid gap-2 py-4">
//                   {fields.map((field, index) => {
//                     if (field === "id") return null;
//                     return (
//                       <div key={index} className="items-center gap-4">
//                         {field.includes("image") ? (
//                           <div className="mb-5 flex flex-col items-center">
//                             {previewImage && (
//                               <img
//                                 src={previewImage}
//                                 alt="current"
//                                 className="mb-2 h-20 w-20 rounded object-cover"
//                               />
//                             )}
//                             <label
//                               htmlFor="file-upload"
//                               className="relative mt-8 flex w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 sm:w-96"
//                             >
//                               <i className="ri-upload-2-line text-2xl"></i>
//                               <span className="absolute -top-8 left-0 font-bold">
//                                 {field}
//                                 <span className="mx-2 text-red-600">*</span>
//                               </span>
//                             </label>
//                             <input
//                               id="file-upload"
//                               type="file"
//                               className="hidden"
//                               onChange={(e) =>
//                                 handleFileChange(e, setFieldValue)
//                               }
//                             />
//                           </div>
//                         ) : field.includes("password") ? (
//                           <Field name={field}>
//                             {({ field }) => (
//                               <input
//                                 {...field}
//                                 type="password"
//                                 placeholder={field.name}
//                                 className="w-72 rounded border px-2 py-1 sm:w-full"
//                               />
//                             )}
//                           </Field>
//                         ) : (
//                           <Field name={field}>
//                             {({ field }) => (
//                               <input
//                                 {...field}
//                                 type="text"
//                                 placeholder={
//                                   field.name === "type" ? "name" : field.name
//                                 }
//                                 className="w-72 rounded border px-2 py-1 sm:w-full"
//                               />
//                             )}
//                           </Field>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="flex justify-end gap-2">
//                   <Button type="submit" title={editMode ? "تعديل" : "إضافة"} />
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   );
// }

// export default DialogDemo;
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

export function DialogDemo({
  trigger,
  fields = [],
  postUrlAdd,
  putUrlUpdate,
  editMode = false,
  initialData = {},
  onSuccess, // الرابط الذي سيتم الانتقال إليه بعد الإضافة/التعديل
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = useState(false);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (editMode && initialData?.image) {
      setPreviewImage(`http://127.0.0.1:8000/storage/${initialData.image}`);
    }
  }, [editMode, initialData]);

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFieldValue("image", file);
    }
  };

  const initialValues = fields.reduce((acc, field) => {
    acc[field] = initialData?.[field] || "";
    return acc;
  }, {});

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const dataToSend = new FormData();
      for (const key in values) {
        if (key !== "id" && key !== "image") {
          dataToSend.append(key, values[key]);
        }
      }

      if (selectedFile) {
        dataToSend.append("image", selectedFile);
      } else if (initialData?.image && editMode) {
        dataToSend.append("existingImage", initialData.image);
      }

      const url = editMode && putUrlUpdate ? putUrlUpdate : postUrlAdd;

      await axios.post(url, dataToSend, {
        headers: { "Content-Type": "multipart/form-data", ...headers },
      });

      resetForm();
      // console.log("", navigateTo);
      if (onSuccess) onSuccess();

      setOpen(false);
    } catch (error) {
      console.error("فشل العملية:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <div onClick={() => setOpen(true)}>{trigger}</div>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <DialogContent className="bg-bodyColor fixed top-1/2 left-1/2 z-50 max-h-[90vh] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 shadow-2xl sm:max-w-md md:max-w-lg md:p-16 lg:w-full">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-xl font-bold"
          >
            ❌
          </button>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form className="w-full">
                <div className="grid gap-2 py-4">
                  {fields.map((field, index) => {
                    if (field === "id") return null;
                    return (
                      <div key={index} className="items-center gap-4">
                        {field.includes("image") ? (
                          <div className="mb-5 flex flex-col items-center">
                            {previewImage && (
                              <img
                                src={previewImage}
                                alt="current"
                                className="mb-2 h-20 w-20 rounded object-cover"
                              />
                            )}
                            <label
                              htmlFor="file-upload"
                              className="relative mt-8 flex w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 sm:w-96"
                            >
                              <i className="ri-upload-2-line text-2xl"></i>
                              <span className="absolute -top-8 left-0 font-bold">
                                {field}
                                <span className="mx-2 text-red-600">*</span>
                              </span>
                            </label>
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(e, setFieldValue)
                              }
                            />
                          </div>
                        ) : field.includes("password") ? (
                          <Field name={field}>
                            {({ field }) => (
                              <input
                                {...field}
                                type="password"
                                placeholder={field.name}
                                className="w-72 rounded border px-2 py-1 sm:w-full"
                              />
                            )}
                          </Field>
                        ) : (
                          <Field name={field}>
                            {({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder={
                                  field.name === "type" ? "name" : field.name
                                }
                                className="w-72 rounded border px-2 py-1 sm:w-full"
                              />
                            )}
                          </Field>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="submit" title={editMode ? "تعديل" : "إضافة"} />
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default DialogDemo;

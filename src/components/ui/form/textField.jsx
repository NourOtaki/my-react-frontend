// import { useField } from "formik";
// import { cn } from "../../../lib/utilities";

// function TextField({ type, name, icon, top, ...props }) {
//   const [field, meta] = useField(name);
//   const hasValue = !!field.value;

//   return (
//     <div className="relative mt-5 h-9 w-full">
//       <input
//         {...field}
//         {...props}
//         type={type}
//         className="peer hover:border-firstColor focus:border-firstColor h-full w-full border-0 border-b-2 border-red-200 bg-transparent pr-5.5 text-[16px] font-semibold outline-0 transition-[.5s]"
//       />
//       <label
//         htmlFor={name}
//         className={cn(
//           "peer-focus:text-firstColor",
//           "peer-hover:text-firstColor",
//           "capitalize",
//           "absolute left-0 translate-y-[-50%] text-[16px] transition-[.5s]",
//           "peer-hover:-top-1",
//           "peer-focus:-top-1",
//           { "-top-1": hasValue },
//           top || "top-[50%]", // 👈 إذا مررت top رح يستخدمه، غير هيك default
//         )}
//       >
//         {name}
//       </label>
//       <i
//         className={cn(
//           icon,
//           "peer-focus:text-firstColor peer-hover:text-firstColor absolute top-[50%] right-0 translate-y-[-50%] text-[18px] transition-[.5s]",
//         )}
//       ></i>
//     </div>
//   );
// }

// export default TextField;
import { useState } from "react";
import { useField } from "formik";
import { cn } from "../../../lib/utilities";

function TextField({ type, name, icon, top, ...props }) {
  const [field, meta] = useField(name);
  const hasValue = !!field.value;
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mt-5 h-9 w-full">
      <input
        {...field}
        {...props}
        type={inputType}
        className="peer hover:border-firstColor focus:border-firstColor h-full w-full border-0 border-b-2 border-red-200 bg-transparent pr-10 text-[16px] font-semibold outline-0 transition-[.5s]"
      />
      <label
        htmlFor={name}
        className={cn(
          "peer-focus:text-firstColor",
          "peer-hover:text-firstColor",
          "capitalize",
          "absolute left-0 translate-y-[-50%] text-[16px] transition-[.5s]",
          // إذا في قيمة تكون فوق دومًا
          { "-top-1": hasValue },
          // hover أو focus يحرك اللابل فوق فقط إذا الحقل فاضي
          !hasValue && "peer-hover:-top-1 peer-focus:-top-1",
          top || " ",
        )}
      >
        {name}
      </label>

      {/* الأيقونة اللي بتمررها دايمًا */}
      {icon && (
        <i
          className={cn(
            icon,
            "peer-hover:text-firstColor peer-focus:text-firstColor absolute top-[50%] right-0 -translate-y-1/2 text-[18px] transition",
          )}
        ></i>
      )}

      {/* زر العين فقط لو الحقل باسورد */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="hover:text-firstColor absolute top-[50%] right-8 -translate-y-1/2 text-[18px] text-gray-500 transition"
        >
          {showPassword ? (
            <i className="ri-eye-off-line" />
          ) : (
            <i className="ri-eye-line relative left-7 text-amber-950" />
          )}
        </button>
      )}
    </div>
  );
}

export default TextField;

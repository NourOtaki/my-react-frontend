// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   return (
//     <nav className="my-4 text-sm text-gray-600">
//       <ol className="flex space-x-2">
//         <li>
//           <Link to="/" className="text-blue-600 hover:underline">
//             الرئيسية
//           </Link>
//         </li>
//         {pathnames.map((name, index) => {
//           const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
//           const isLast = index === pathnames.length - 1;
//           const displayName = decodeURIComponent(name);

//           return (
//             <li key={routeTo} className="flex items-center space-x-2">
//               <span>/</span>
//               {isLast ? (
//                 <span className="text-gray-500">{displayName}</span>
//               ) : (
//                 <Link to={routeTo} className="text-blue-600 hover:underline">
//                   {displayName}
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumbs;
// بدي اعمل breadcurmb باستخدام رياكت و تالويند وبحيث كل ما ادخل بعمق الصفحة يكتبلي فيه الرابط الجديد يعني بفرض عندي 3 صفحات متداخلة انا ما بدي يكتبلي فورا اصناف ثم انواع ثم تفاصيل انا بدي كل ما ا\خل يكتبلي من الاول ل حد ما وصلت
// تمام ولكن لدي بعد التعديلات انا حطيت الروتات هيك  path: ":detailsId", Component: Details, name: "Details"  انا بدي لمايجلب يجلب ال name يحطو بال breadcurmb وعند الضغط على الاسم ينقلني للرابط لي هو هون path

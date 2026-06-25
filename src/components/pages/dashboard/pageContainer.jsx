// import React, { useRef, useState } from "react";
// import Button from "../../ui/button";
// import  DialogDemo  from "../../ui/dialog";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// const PageContainerProps = {
//   title: String,
//   filterComponent: Boolean,
//   //   data,
//   // columns,
//   searchComponent: Boolean,
//   addFunction: Boolean,
// };
// function PageContainer({
//   title,
//   // table,
//   filterComponent,
//   addFunction,
//   columns,
//   data,
//   dataDialog,
//   titleDialog,
//   FilterName,
//   searchComponent,
//   postUrlAdd,
//   onFilterClick,
//   onSuccess,
// }) {
//   const [filterState, setFilterState] = useState(false);
//   const [dataS, setDataS] = useState(data);
//   const ref = useRef("");

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//   return (
//     <>
//       <div className="my-3 flex relative  justify-between px-3">
//         <div className="text-firstColor  font-Carter relative top-5 left-24 w-60 text-3xl font-extrabold">
//           {title}
//         </div>
//         <div className="px-8 flex  py-2">
//           {searchComponent && (
//             <div className="relative row top-10 left-25">
//               <i class="ri-search-line absolute top-3.5 right-6">
//                 <span className="ms-2">بحث</span>
//               </i>
//               <input
//                 type="text"
//                 className="relative top-1 h-11 w-4/12 rounded-md border-2 border-red-200 px-9 sm:text-sm"
//                 ref={ref}
//                 onChange={async () => {
//                   await setTimeout(() => {}, 2000);
//                   setDataS((prev) =>
//                     dataS.filter((item) =>
//                       item.employeesName.includes(ref.current.value),
//                     ),
//                   );
//                 }}
//               ></input>
//             </div>
//           )}
//           {filterComponent && (
//             <Button
//               icon={<i class="ri-filter-2-line mx-1"></i>}
//               title={FilterName || "filter"}
//               className={
//                 "mx-2 border-2 border-red-200 bg-transparent font-bold text-[#4B465C]"
//               }
//               onClick={onFilterClick}
//               // onClick={() => setFilterState((prop) => !prop)}
//             ></Button>
//           )}
//           {addFunction && (
//             <>
//               <DialogDemo
//                 trigger={
//                   <Button
//                     className={"font-bold"}
//                     title={`Add ${titleDialog}`}
//                   ></Button>
//                 }
//                 fields={dataDialog}
//                 postUrlAdd={postUrlAdd}
//                 onSuccess={onSuccess}
//               ></DialogDemo>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="mx-4">
//         {table && (
//           <div w={table.getTotalSize()} className="mx-14 overflow-x-auto">
//             <table className="min-w-full border-2 border-red-200">
//               <thead className="border-2 border-red-200 px-10">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((column) => (
//                       <th
//                         w={column.getSize()}
//                         className="px-4 py-2 text-start"
//                         key={column.id}
//                       >
//                         {column.column.columnDef.header}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td
//                         key={cell.id}
//                         W={cell.column.getSize()}
//                         className="border-b-2 border-red-200 px-5 py-2 text-sm"
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext(),
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default PageContainer;
import React, { useRef, useState } from "react";
import Button from "../../ui/button";
import DialogDemo from "../../ui/dialog";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router";

function PageContainer({
  title,
  filterComponent,
  addFunction,
  columns,
  data,
  dataDialog,
  titleDialog,
  FilterName,
  searchComponent,
  postUrlAdd, // استخدام DialogDemo
  redirectLink, // إذا حبيت تحول للصفحة الجديدة
  onFilterClick,
  onSuccess,
}) {
  const [filterState, setFilterState] = useState(false);
  const [dataS, setDataS] = useState(data);
  const ref = useRef("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="relative my-3 flex justify-between px-3">
        <div className="text-firstColor font-Carter relative top-5 left-24 w-60 text-3xl font-extrabold">
          {title}
        </div>
        <div className="flex px-8 py-2">
          {searchComponent && (
            <div className="row relative top-10 left-25">
              <i className="ri-search-line absolute top-3.5 right-6">
                <span className="ms-2">بحث</span>
              </i>
              <input
                type="text"
                className="relative top-1 h-11 w-4/12 rounded-md border-2 border-red-200 px-9 sm:text-sm"
                ref={ref}
                onChange={async () => {
                  await setTimeout(() => {}, 2000);
                  setDataS((prev) =>
                    dataS.filter((item) =>
                      item.employeesName.includes(ref.current.value),
                    ),
                  );
                }}
              />
            </div>
          )}

          {/* {filterComponent && (
            <Button
              icon={<i className="ri-filter-2-line mx-1"></i>}
              title={FilterName || "filter"}
              className={
                "mx-2 border-2 border-red-200 bg-transparent font-bold text-[#4B465C]"
              }
              onClick={onFilterClick}
            />
          )} */}

          {addFunction && (
            <>
              {postUrlAdd ? (
                <DialogDemo
                  trigger={
                    <Button
                      className={"font-bold"}
                      title={`Add ${titleDialog}`}
                    />
                  }
                  fields={dataDialog}
                  postUrlAdd={postUrlAdd}
                  onSuccess={onSuccess}
                />
              ) : redirectLink ? (
                <Link to={redirectLink}>
                  <Button
                    className={"font-bold"}
                    title={titleDialog}
                    // onClick={() => (window.location.href = redirectLink)}
                  />
                </Link>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className="mx-4 my-6">
        {table && (
          <div w={table.getTotalSize()} className="mx-14 overflow-x-auto">
            <table className="min-w-full border-2 border-red-200">
              <thead className="border-2 border-red-200 px-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        w={column.getSize()}
                        className="px-4 py-2 text-start"
                        key={column.id}
                      >
                        {column.column.columnDef.header}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        W={cell.column.getSize()}
                        className="border-b-2 border-red-200 px-5 py-2 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default PageContainer;

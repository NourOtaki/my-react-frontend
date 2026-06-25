import React, { useEffect, useState } from "react";
import PageContainer from "../pageContainer";
import DialogDemo from "../../../ui/dialog";
import axios from "axios";
import { Link } from "react-router";

function CategoriesDash() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/showAllCategory");
      setData(res.data);
    } catch (err) {
      console.error("خطأ بجلب البيانات:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/deleteCategory/${id}`,
      );
      console.log("Deleted successfully:", response.data);
      fetchData(); // ✅ تحديث القائمة بعد الحذف
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const dataDialog = ["type", "image"];

  const columns = [
    {
      accessorKey: "id",
      header: "category id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image",
      header: "category image",
      cell: (info) => (
        <img
          src={`http://127.0.0.1:8000/storage/${info.getValue()}`}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      accessorKey: "type",
      header: "category name",
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Link to={`${info.row.original.id}`}>
            <i className="ri-menu-fold-4-line cursor-pointer text-xl text-[#4B465C]"></i>
          </Link>
          <i
            onClick={() => handleDelete(info.row.original.id)}
            className="ri-delete-bin-5-line cursor-pointer text-xl text-red-500"
          ></i>
          <DialogDemo
            trigger={
              <i className="ri-pencil-line cursor-pointer text-xl text-blue-400"></i>
            }
            fields={dataDialog}
            putUrlUpdate={`http://127.0.0.1:8000/api/updateCategory/${info.row.original.id}`}
            editMode={true}
            initialData={info.row.original}
            onSuccess={fetchData}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        title={"Categories"}
        filterComponent
        addFunction
        table
        data={data}
        columns={columns}
        dataDialog={dataDialog}
        titleDialog={"category"}
        postUrlAdd={"http://127.0.0.1:8000/api/insertCategory"}
        onSuccess={fetchData}
      />
    </>
  );
}

export default CategoriesDash;

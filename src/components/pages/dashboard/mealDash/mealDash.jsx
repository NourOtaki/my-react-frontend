import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageContainer from "../pageContainer";
import DialogDemo from "../../../ui/dialog";
import axios from "axios";

function MealDash() {
  const { categoryId } = useParams();
  const [data, setData] = useState([]);

  // ✅ دالة fetchData
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/showAllMeal/${categoryId}`,
      );
      setData(res.data);
    } catch (err) {
      console.error("خطأ بجلب الوجبات:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); 

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/deleteMeal/${id}`,
      );
      console.log("Deleted successfully:", response.data);

      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const dataDialog = [
    "category_id",
    "type",
    "image",
    "price",
    "stars",
    "has_types",
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "meal id ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "category_id",
      header: "category id ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image",
      header: " meal image",
      cell: (info) => (
        <img
          src={`http://127.0.0.1:8000/storage/${info.getValue()}`}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      accessorKey: "type",
      header: "meal name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "price",
      header: "price",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "stars",
      header: "stars",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "has_types",
      header: "Has Types",
      cell: (info) =>
        info.getValue() ? (
          <span className="font-bold text-green-600">✅</span>
        ) : (
          <span className="font-bold text-red-600">❌</span>
        ),
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center">
          <Link to={`${info.row.original.id}`}>
            <i className="ri-menu-fold-4-line text-xl text-[#4B465C]"></i>
          </Link>
          <i
            onClick={() => handleDelete(info.row.original.id)}
            className="ri-delete-bin-5-line px-2 text-xl text-red-500"
          ></i>
          <DialogDemo
            trigger={<i className="ri-pencil-line text-xl text-blue-400"></i>}
            fields={dataDialog}
            putUrlUpdate={`http://127.0.0.1:8000/api/updateMeal/${info.row.original.id}`}
            editMode={true}
            initialData={info.row.original}
            onSuccess={fetchData} // ✅ بعد التعديل رجع جب البيانات
          />
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title={"Meals"}
      filterComponent
      addFunction
      table
      data={data}
      columns={columns}
      dataDialog={dataDialog}
      titleDialog={"meals"}
      postUrlAdd={`http://127.0.0.1:8000/api/insertMeal`}
      onSuccess={fetchData} // ✅ بعد الإضافة رجع جب البيانات
    />
  );
}

export default MealDash;

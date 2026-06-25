import React, { useEffect, useState } from "react";
import PageContainer from "../pageContainer";
import DialogDemo from "../../../ui/dialog";
import axios from "axios";
import { useParams } from "react-router";

function TypeDash() {
  const [data, setData] = useState([]);
  const { mealId } = useParams();

  // ✅ دالة fetchData لجلب الأنواع
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/showAllTypesMeals/${mealId}`,
      );
      setData(res.data);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mealId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/deleteTypesMeals/${id}`,
      );
      console.log("Deleted successfully:", response.data);
      // ✅ بدل reload → نرجع نجيب الداتا
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const dataDialog = ["meal_id", "name", "image", "price"];

  const columns = [
    {
      accessorKey: "id",
      header: "type id ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "meal_id",
      header: "meal id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image",
      header: " type image",
      cell: (info) => (
        <img
          src={`http://127.0.0.1:8000/storage/${info.getValue()}`}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "type name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "price",
      header: "price",
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center">
          <i
            onClick={() => handleDelete(info.row.original.id)}
            className="ri-delete-bin-5-line px-2 text-xl text-red-500"
          ></i>
          <DialogDemo
            trigger={<i className="ri-pencil-line text-xl text-blue-400"></i>}
            fields={dataDialog}
            putUrlUpdate={`http://127.0.0.1:8000/api/updateTypesMeals/${info.row.original.id}`}
            editMode={true}
            initialData={info.row.original}
            onSuccess={fetchData} // ✅ تحديث الداتا بعد التعديل
          />
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title={"Types Meal"}
      filterComponent
      addFunction
      table
      data={data}
      columns={columns}
      dataDialog={dataDialog}
      titleDialog={"Type"}
      onSuccess={fetchData} // ✅ تحديث الداتا بعد الإضافة
      postUrlAdd={`http://127.0.0.1:8000/api/insertTypesMeals`}
    />
  );
}

export default TypeDash;

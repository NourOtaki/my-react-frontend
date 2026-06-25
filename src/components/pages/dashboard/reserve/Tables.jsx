
import React, { useEffect, useState } from "react";
import Loader from "../../../ui/loader";
import { useShowTablesMutation } from "@/services/showTablesApi";
import { useDeleteTableMutation } from "@/services/deleteTableApi";
import { useReservedTableMutation } from "@/services/reservedTableApi";
import PageContainer from "../pageContainer";
import DialogDemo from "@/components/ui/dialog";

function Tables() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTables] = useShowTablesMutation();
  const [deleteTable] = useDeleteTableMutation();
  const [reservedTable] = useReservedTableMutation();

  // ✅ دالة fetchTables (بدل fetchUsers)
  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await showTables();
      setUsers(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching tables");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await deleteTable(id);
      console.log("Deleted successfully:", response.data);
      // ✅ تحديث بدون reload
      fetchTables();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading)
    return (
      <div className="relative top-10 my-10">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-firstColor flex justify-center align-middle">
        Error: {error}
      </div>
    );

  const dataDialog = ["id", "capacity", "price", "status"];

  const columns = [
    {
      accessorKey: "id",
      header: "table id ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "capacity",
      header: "capacity",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "price",
      header: "price",
      cell: (info) => info.getValue(),
    },
    // {
    //   accessorKey: "status",
    //   header: "status",
    //   cell: (info) => info.getValue(),
    // },
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
            putUrlUpdate={`http://127.0.0.1:8000/api/updatetable/${info.row.original.id}`}
            editMode={true}
            initialData={info.row.original}
            onSuccess={fetchTables} // ✅ إعادة تحميل الداتا بعد التعديل
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {users.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No tables available</p>
      ) : (
        <PageContainer
          title={"Tables"}
          addFunction={true}
          titleDialog="Table reserved"
          redirectLink={"reserved"}
          table
          data={users}
          columns={columns}
          dataDialog={dataDialog}
          onSuccess={fetchTables} // ✅ إعادة تحميل بعد الإضافة
        />
      )}
    </div>
  );
}

export default Tables;

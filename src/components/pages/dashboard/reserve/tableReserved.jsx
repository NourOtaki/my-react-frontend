import React, { useEffect, useState } from "react";
import Loader from "../../../ui/loader";
import { useReservedTableMutation } from "@/services/reservedTableApi";
import { useDeleteTableMutation } from "@/services/deleteTableApi";
import PageContainer from "../pageContainer";
import DialogDemo from "@/components/ui/dialog";

function TablesReserved() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTables] = useReservedTableMutation();
  const [deleteTable] = useDeleteTableMutation();

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await showTables();

      // التعامل مع احتمال اختلاف بنية الاستجابة
      const tables =
        response.data?.reserved_tables ||
        response.data?.data?.reserved_tables ||
        [];

      // إضافة reservationsInfo لكل طاولة مع وقت البداية والنهاية
      const reservedTables = tables
        .map((table) => ({
          ...table,
          reservationsInfo:
            table.reservations?.map((r) => ({
              reservation_id: r.id,
              reservation_time: r.pivot?.reservation_time,
              reservation_end_time: r.pivot?.reservation_end_time, // ← وقت الانتهاء
              status: r.pivot?.status || "reserved",
            })) || [],
        }))
        // عرض فقط الطاولات التي تحتوي على حجوزات
        .filter((table) => table.reservationsInfo.length > 0);

      setUsers(reservedTables);
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
      await deleteTable(id);
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
    { accessorKey: "id", header: "Table ID", cell: (info) => info.getValue() },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: (info) => info.getValue(),
    },
    { accessorKey: "price", header: "Price", cell: (info) => info.getValue() },
    {
      accessorKey: "reservations",
      header: "Reservations",
      cell: (info) => (
        <div className="flex flex-col gap-1">
          {info.row.original.reservationsInfo.map((res) => (
            <span key={res.reservation_id} className="text-sm">
              {res.reservation_time} - {res.reservation_end_time} -{" "}
              <strong>{res.status}</strong>
            </span>
          ))}
        </div>
      ),
    },
    // يمكن إضافة عمود Actions إذا أردت
  ];

  return (
    <div>
      {users.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No reserved tables</p>
      ) : (
        <PageContainer
          title={"Tables Reserved"}
          table
          data={users}
          columns={columns}
          dataDialog={dataDialog}
          onSuccess={fetchTables}
        />
      )}
    </div>
  );
}

export default TablesReserved;

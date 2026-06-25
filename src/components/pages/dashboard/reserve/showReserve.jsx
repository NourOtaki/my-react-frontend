
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../ui/loader";
import Button from "@/components/ui/button";

function ShowReserve() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("TOKEN");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/reservations/all`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        // افتراضياً response.data هو المصفوفة
        setReservations(response.data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading)
    return (
      <div className="relative top-10 my-10">
        <Loader />
      </div>
    );

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="border-firstColor relative mx-20 my-30 grid min-h-screen gap-x-10 rounded-4xl border-t-4 px-[10%] py-18 sm:px-[21%] md:grid-cols-2 md:items-start md:gap-y-0 md:px-10 lg:gap-x-16 lg:px-14 xl:gap-x-28 xl:px-2">
      {reservations.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No reservations available now.
        </p>
      ) : (
        reservations.map((reserve) => (
          <div
            key={reserve.id}
            className="bg-containerColor relative -top-10 row-auto m-6 flex w-[360px] rounded-4xl shadow-2xl transition duration-[0.4s] hover:scale-[1.05] md:h-44 md:w-[350px] lg:h-62 lg:w-[465px] xl:w-[484px]"
          >
            <div className="relative top-10 p-4 lg:mx-13">
              <p className="font-bold">Reservation #{reserve.id}</p>
              <p>User: {reserve.user?.name ?? reserve.user_id}</p>
              <p>Time: {reserve.reservation_time}</p>
              <p>People: {reserve.people_count}</p>
              <p>Phone: {reserve.phone}</p>
              <p>Total: {reserve.total_price}</p>
              <p>Status: {reserve.status}</p>

              {/* زر الإلغاء يظهر فقط للحجوزات المؤكدة */}
              {/* {reserve.status === "confirmed" && (
                <Button
                  className="-top-8 left-64 relative  bg-red-500 text-white hover:bg-red-600"
                  title="Cancel"
                  onClick={() => cancelReservation(reserve.id)}
                />
              )} */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowReserve;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

function ReserveLast() {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest reservation
  useEffect(() => {
    const fetchLastReservation = async () => {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        setError("Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/reservations/latest",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setReservation(res.data.reservation || null);
      } catch (err) {
        console.error(
          "Failed to fetch last reservation:",
          err.response?.data || err.message,
        );
        setError("Failed to fetch the latest reservation.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastReservation();
  }, []);

  // Cancel reservation
  const cancelReservation = async (id) => {
    try {
      const token = localStorage.getItem("TOKEN");
      await axios.post(
        `http://127.0.0.1:8000/api/reservations/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setReservation((prev) =>
        prev ? { ...prev, status: "canceled", canceled_at: new Date() } : prev,
      );

      toast.success("Reservation canceled successfully!", {
        duration: 4000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Failed to cancel reservation:", err);
      toast.error("An error occurred while canceling the reservation.", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;
  if (!reservation)
    return (
      <p className="mt-10 text-center text-gray-500">
        You don’t have any reservations. Please make one first.
      </p>
    );

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="font-Carter mb-6 text-2xl font-bold">
        Your Latest Reservation
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Date & Time:</span>{" "}
          {dayjs(reservation.reservation_time).format("YYYY-MM-DD HH:mm")}
        </p>
        <p>
          <span className="font-semibold">Number of People:</span>{" "}
          {reservation.people_count}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {reservation.phone}
        </p>
        {reservation.tables?.length > 0 && (
          <p>
            <span className="font-semibold">Total Price:</span> $
            {reservation.total_price}
          </p>
        )}
      </div>

      {/* Reserved Tables */}
      {reservation.tables?.length === 0 ? (
        <p className="mt-4 font-medium text-yellow-600">No tables reserved.</p>
      ) : (
        <div className="mt-4">
          <p className="mb-2 font-semibold text-gray-800">Reserved Tables:</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reservation.tables.map((table) => (
              <div
                key={table.id}
                className="rounded-xl border bg-gray-50 p-3 shadow-sm transition hover:shadow-md"
              >
                <p>
                  <span className="font-semibold">Table #:</span> {table.id}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span>{" "}
                  {table.capacity}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${table.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Button */}
      {reservation.status === "confirmed" && (
        <Button
          className="mt-6 w-full bg-red-500 text-white hover:bg-red-600"
          title="Cancel Reservation"
          onClick={() => cancelReservation(reservation.id)}
        />
      )}
    </div>
  );
}

export default ReserveLast;

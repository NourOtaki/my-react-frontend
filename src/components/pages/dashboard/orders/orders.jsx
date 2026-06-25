
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/ui/loader";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const token = localStorage.getItem("TOKEN");

  const [pendingBills, setPendingBills] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);

  const [allBills, setAllBills] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const [error, setError] = useState(null);

  const [rejectReason, setRejectReason] = useState("");
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [showRejectInput, setShowRejectInput] = useState(false);

  // Fetch pending bills
  useEffect(() => {
    const fetchPendingBills = async () => {
      if (!token) return;
      setLoadingPending(true);
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/pending-approvals",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setPendingBills(res.data.bills || []);
      } catch (err) {
        console.error("AxiosError", err);
        setError(
          err.response?.data?.message || "Failed to fetch pending bills.",
        );
        toast.error("Failed to fetch pending bills.");
      } finally {
        setLoadingPending(false);
      }
    };

    fetchPendingBills();
  }, [token]);

  // Approve bill
  const approveBill = async (billId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/bills/${billId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("✅ Bill approved successfully.");
      setPendingBills(pendingBills.filter((b) => b.id !== billId));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to approve bill.");
    }
  };

  // Reject bill
  // const rejectBill = async (billId) => {
  //   if (!rejectReason.trim()) {
  //     toast.info("Please enter a reason for rejection.");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       `http://127.0.0.1:8000/api/bills/${billId}/reject`,
  //       { reason: rejectReason },
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );
  //     toast.info("❌ Bill rejected successfully.");
  //     setPendingBills(pendingBills.filter((b) => b.id !== billId));
  //     setRejectReason("");
  //     setSelectedBillId(null);
  //     setShowRejectInput(false);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("❌ Failed to reject bill.");
  //   }
  // };

  // Fetch all bills
  const fetchAllBills = async () => {
    if (!token) return;
    setLoadingAll(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/bills", {
        // headers: { Authorization: `Bearer ${token}` },
      });
      setAllBills(res.data.bills || []);
    } catch (err) {
      console.error("AxiosError", err);
      toast.error(err.response?.data?.message || "Failed to fetch all bills.");
    } finally {
      setLoadingAll(false);
    }
  };

  return (
    <div className="px-16 py-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Pending Bills */}
      <h2 className="mb-4 text-2xl font-bold">Pending Bills for Approval</h2>
      {loadingPending ? (
        <Loader />
      ) : pendingBills.length === 0 ? (
        <p className="text-gray-500">No pending bills.</p>
      ) : (
        <div className="mb-8 overflow-x-auto rounded-lg border shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left">Bill ID</th>
                <th className="border-b px-4 py-2 text-left">User</th>
                <th className="border-b px-4 py-2 text-left">Total ($)</th>
                <th className="border-b px-4 py-2 text-left">Payment Method</th>
                <th className="border-b px-4 py-2 text-left">Status</th>
                <th className="border-b px-4 py-2 text-left">Created At</th>
                <th className="border-b px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{bill.id}</td>
                  <td className="border-b px-4 py-2">
                    {bill.user?.name || "N/A"}
                  </td>
                  <td className="border-b px-4 py-2">{bill.grand_total}</td>
                  <td className="border-b px-4 py-2">{bill.payment_method}</td>
                  <td className="border-b px-4 py-2 text-yellow-600">
                    {bill.payment_status}
                  </td>
                  <td className="border-b px-4 py-2">
                    {dayjs(bill.created_at).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="border-b px-4 py-2">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => approveBill(bill.id)}
                        className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                      >
                        Approve
                      </button>

                      {selectedBillId === bill.id && showRejectInput ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="text"
                            placeholder="Enter rejection reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="rounded border px-2 py-1 text-sm"
                          />
                          <div className="flex gap-1">
                            <button
                              onClick={() => rejectBill(bill.id)}
                              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => {
                                setShowRejectInput(false);
                                setRejectReason("");
                                setSelectedBillId(null);
                              }}
                              className="rounded bg-gray-300 px-3 py-1 text-black hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedBillId(bill.id);
                            setShowRejectInput(true);
                          }}
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* All Bills */}
      <h2 className="mb-4 text-2xl font-bold">All Bills</h2>
      <button
        onClick={fetchAllBills}
        className="mb-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Fetch All Bills
      </button>
      {loadingAll ? (
        <Loader />
      ) : allBills.length === 0 ? (
        <p className="text-gray-500">No bills found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left">Bill ID</th>
                <th className="border-b px-4 py-2 text-left">User</th>
                <th className="border-b px-4 py-2 text-left">Total ($)</th>
                <th className="border-b px-4 py-2 text-left">Payment Method</th>
                <th className="border-b px-4 py-2 text-left">Status</th>
                <th className="border-b px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {allBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{bill.id}</td>
                  <td className="border-b px-4 py-2">
                    {bill.user?.name || "N/A"}
                  </td>
                  <td className="border-b px-4 py-2">{bill.grand_total}</td>
                  <td className="border-b px-4 py-2">{bill.payment_method}</td>
                  <td className="border-b px-4 py-2">{bill.payment_status}</td>
                  <td className="border-b px-4 py-2">
                    {dayjs(bill.created_at).format("YYYY-MM-DD HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;

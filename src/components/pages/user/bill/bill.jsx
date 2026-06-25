// // import React, { useEffect, useState } from "react";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import axios from "axios";
// // import { useSelector } from "react-redux";
// // import Loader from "@/components/ui/loader";
// // import { useBillMutation } from "@/services/billApi";
// // import img1 from "../../../../assets/img/layout/leaf-branch-1.png";
// // import img2 from "../../../../assets/img/layout/leaf-branch-2.png";
// // import MapPicker from "./MapPicker";
// // import dayjs from "dayjs";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // function Bill() {
// //   const user = useSelector((state) => state.auth.user);
// //   const userId = user?.userID ?? null;
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [Bill] = useBillMutation();
// //   const token = localStorage.getItem("TOKEN");

// //   const [form, setForm] = useState({
// //     order_state: "out",
// //     order_date: "",
// //     lat: "",
// //     lng: "",
// //   });

// //   const [billId, setBillId] = useState(null);
// //   const [localTotal, setLocalTotal] = useState(null);

// //   const [paymentForm, setPaymentForm] = useState({
// //     provider: "",
// //     phone: "",
// //     email: "",
// //   });

// //   useEffect(() => {
// //     AOS.init();
// //   }, []);

// //   // جلب السلة مع التحقق من موافقة الأدمين
// //   const fetchItemCart = async () => {
// //     if (!token) return;
// //     try {
// //       const response = await Bill();
// //       const cartData = response?.data?.data || null;

// //       if (cartData?.bill_status === "approved") {
// //         setData(null);
// //         setBillId(null);
// //         setLocalTotal(null);
// //         toast.info("✅ Your bill was approved by admin. Cart cleared.");
// //         return;
// //       }

// //       setData(cartData);
// //       if (cartData) {
// //         setForm((prev) => ({
// //           ...prev,
// //           order_state: cartData.order_state || "out",
// //           order_date: cartData.order_date || "",
// //           lat: cartData.lat || "",
// //           lng: cartData.lng || "",
// //         }));
// //         if (cartData.order_state === "in") {
// //           setLocalTotal(cartData.subtotal + (cartData.table_price ?? 0));
// //         }
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchItemCart();
// //     const interval = setInterval(fetchItemCart, 10000);
// //     return () => clearInterval(interval);
// //   }, [Bill, userId]);

// //   // جلب آخر حجز للطلب الداخلي
// //   useEffect(() => {
// //     const fetchLastReservation = async () => {
// //       if (!token) return;
// //       try {
// //         const res = await axios.get(
// //           "http://127.0.0.1:8000/api/reservations/latest",
// //           { headers: { Authorization: `Bearer ${token}` } },
// //         );

// //         const reservation = res?.data?.reservation;
// //         if (reservation && reservation.tables?.length > 0) {
// //           const tablePrice = parseFloat(reservation.tables[0].price);

// //           setForm((prev) => ({
// //             ...prev,
// //             order_date: dayjs(reservation.reservation_time).format(
// //               "YYYY-MM-DDTHH:mm",
// //             ),
// //           }));

// //           setData((prev) => ({
// //             ...prev,
// //             table_price: tablePrice,
// //           }));

// //           setLocalTotal((prev) => (data?.subtotal ?? 0) + tablePrice);
// //         }
// //       } catch (err) {
// //         console.error(
// //           "Failed fetching last reservation:",
// //           err?.response?.data || err.message,
// //         );
// //       }
// //     };

// //     if (form.order_state === "in") {
// //       fetchLastReservation();
// //     } else {
// //       setLocalTotal(null);
// //     }
// //   }, [form.order_state, token]);

// //   const updateLocation = async (lat, lng) => {
// //     setForm((prev) => ({ ...prev, lat, lng }));

// //     if (!token || !data) return;

// //     try {
// //       const response = await axios.post(
// //         `http://127.0.0.1:8000/api/carts/${data.cart_id}/location`,
// //         { lat, lng },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       setData((prev) => ({
// //         ...prev,
// //         distance_km: response?.data?.distance_km,
// //         delivery_fee: response?.data?.delivery_fee,
// //         total: response?.data?.total,
// //       }));
// //       toast.success("Location updated successfully!");
// //     } catch (err) {
// //       console.error(
// //         "Failed updating location:",
// //         err?.response?.data || err.message,
// //       );
// //       toast.error("Error updating location.");
// //     }
// //   };

// //   const updateQuantity = async (cartItemId, newQuantity) => {
// //     if (newQuantity < 1) return;
// //     if (!token) return toast.error("Please log in again.");

// //     try {
// //       const item = data?.items?.find((i) => i.cart_item_id === cartItemId);
// //       if (!item) return;

// //       await axios.post(
// //         `http://127.0.0.1:8000/api/carts/${data.cart_id}/${item.meal.id}/quantity`,
// //         {
// //           cart_id: data.cart_id,
// //           meal_id: item.meal.id,
// //           type_meal_id: item.type_meal?.id ?? null,
// //           quantity: newQuantity,
// //         },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       const response = await Bill();
// //       const cartData = response?.data?.data || null;
// //       setData(cartData);

// //       if (form.order_state === "in") {
// //         setLocalTotal(cartData?.subtotal + (cartData?.table_price ?? 0));
// //       }
// //       toast.success("Quantity updated successfully!");
// //     } catch (err) {
// //       console.error("Failed updating quantity:", err);
// //       toast.error("Error updating quantity.");
// //     }
// //   };

// //   const deleteItem = async (cartItemId) => {
// //     if (!token) return toast.error("Please log in again.");
// //     try {
// //       await axios.delete(
// //         `http://127.0.0.1:8000/api/carts/${data.cart_id}/${cartItemId}`,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       setData((prev) => ({
// //         ...prev,
// //         items: prev?.items?.filter((item) => item.cart_item_id !== cartItemId),
// //       }));
// //       toast.success("Item deleted successfully!");
// //     } catch (err) {
// //       console.error("Failed deleting item:", err);
// //       toast.error("Error deleting item.");
// //     }
// //   };

// //   const displayTotal =
// //     form.order_state === "in" ? (localTotal ?? 0) : (data?.total ?? 0);

// //   const createBill = async () => {
// //     if (!token) return toast.error("Please log in again.");
// //     if (!data) return;

// //     if (!paymentForm.provider)
// //       return toast.error("Please select a payment method.");
// //     if (
// //       (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") &&
// //       !paymentForm.phone
// //     ) {
// //       return toast.error("Please enter a phone number.");
// //     }
// //     if (paymentForm.provider === "wallet" && !paymentForm.email) {
// //       return toast.error("Please enter a wallet email.");
// //     }

// //     const payload = {
// //       ...(form.order_state === "in"
// //         ? { order_date: form.order_date, order_state: "in" }
// //         : {
// //             order_date: form.order_date,
// //             order_state: "out",
// //             lat: form.lat,
// //             lng: form.lng,
// //           }),
// //       payment_method: paymentForm.provider,
// //       grand_total: displayTotal,
// //     };

// //     try {
// //       const res = await axios.post(
// //         `http://127.0.0.1:8000/api/bills/${data.cart_id}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       setBillId(res?.data?.bill?.id);
// //       toast.success(
// //         "Bill created successfully. Waiting for admin approval before clearing the cart.",
// //       );
// //     } catch (err) {
// //       console.error(
// //         "Failed creating bill:",
// //         err?.response?.data || err.message,
// //       );
// //       toast.error("Failed to create bill.");
// //     }
// //   };

// //   const payBill = async () => {
// //     if (!token) return toast.error("Please log in again.");
// //     if (!billId) return toast.error("Please create a bill first.");

// //     const payload = { provider: paymentForm.provider };

// //     if (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") {
// //       payload.phone = paymentForm.phone;
// //     } else if (paymentForm.provider === "wallet") {
// //       payload.email = paymentForm.email;
// //     }

// //     try {
// //       await axios.post(
// //         `http://127.0.0.1:8000/api/payments/${billId}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.info(
// //         "Payment request sent. Waiting for admin approval. Cart will not be cleared until approval.",
// //       );
// //     } catch (err) {
// //       console.error("Failed payment:", err?.response?.data || err.message);
// //       toast.error("Payment failed.");
// //     }
// //   };

// //   if (loading) return <Loader />;
// //   if (error) return <div className="text-lg text-red-500">Error: {error}</div>;
// //   if (!data || !data.items || data.items.length === 0)
// //     return (
// //       <p className="mt-10 text-center text-xl text-gray-500">
// //         Your cart is empty.
// //       </p>
// //     );

// //   return (
// //     <div className="relative p-6">
// //       <ToastContainer position="top-right" autoClose={3000} />
// //       <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
// //       <img src={img1} className="absolute top-[75%] left-[94%] h-28" />

// //       {/* جدول المنتجات */}
// //       <div
// //         className="rounded-2xl border-4 border-red-200 bg-red-50 p-5 text-2xl shadow-lg"
// //         data-aos="fade-up"
// //       >
// //         <div className="space-y-3">
// //           <div className="flex h-20 items-center justify-between rounded-xl bg-white p-3 font-bold shadow-sm">
// //             <div>Image</div>
// //             <h3 className="mx-14">
// //               Meal <br /> Type
// //             </h3>
// //             <p>Price</p>
// //             <div>Quantity</div>
// //             <p>Total price</p>
// //           </div>

// //           {data.items.map((item) => (
// //             <div
// //               key={item.cart_item_id}
// //               className="mb-2 flex h-28 items-center justify-between rounded-xl bg-white p-3 shadow-sm"
// //             >
// //               <img
// //                 src={`http://127.0.0.1:8000/storage/${item.type_meal?.image ?? item.meal.image}`}
// //                 alt={item.meal.type}
// //                 className="h-24 w-24 rounded-lg object-cover"
// //               />
// //               <div>
// //                 <h3>{item.meal.type}</h3>
// //                 {item.type_meal && <p>{item.type_meal.name}</p>}
// //               </div>
// //               <p>{item.type_meal?.price ?? item.price_per_item}$</p>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 value={item.quantity}
// //                 onChange={(e) =>
// //                   updateQuantity(item.cart_item_id, parseInt(e.target.value))
// //                 }
// //                 className="w-16 rounded border p-1 text-center"
// //               />
// //               <p>{item.total_price_per_item}$</p>
// //               <button
// //                 onClick={() => deleteItem(item.cart_item_id)}
// //                 className="rounded"
// //               >
// //                 <i className="ri-delete-bin-5-line cursor-pointer text-2xl text-red-500"></i>
// //               </button>
// //             </div>
// //           ))}
// //         </div>

// //         {/* خيارات الطلب والدفع */}
// //         <div className="mt-5 flex flex-col gap-5 md:flex-row">
// //           <div className="flex w-full flex-col gap-4 md:w-1/2">
// //             <h3 className="text-xl font-bold">Complete Order</h3>
// //             <div className="mb-1 flex gap-2">
// //               <button
// //                 type="button"
// //                 onClick={() => setForm({ ...form, order_state: "in" })}
// //                 className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "in" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
// //               >
// //                 Internal
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setForm({ ...form, order_state: "out" })}
// //                 className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "out" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
// //               >
// //                 Delivery
// //               </button>
// //             </div>

// //             {form.order_state === "out" && (
// //               <>
// //                 <input
// //                   type="datetime-local"
// //                   min={dayjs().format("YYYY-MM-DDTHH:mm")}
// //                   value={form.order_date}
// //                   onChange={(e) =>
// //                     setForm({ ...form, order_date: e.target.value })
// //                   }
// //                   className="mb-2 w-full rounded border p-2"
// //                 />
// //                 <MapPicker onSelect={updateLocation} />
// //               </>
// //             )}

// //             {/* خيارات الدفع */}
// //             <div className="mt-2">
// //               <select
// //                 value={paymentForm.provider}
// //                 onChange={(e) =>
// //                   setPaymentForm({
// //                     provider: e.target.value,
// //                     phone: "",
// //                     email: "",
// //                   })
// //                 }
// //                 className="w-full rounded border p-2"
// //               >
// //                 <option value="">-- اختر طريقة الدفع --</option>
// //                 <option value="mtn">MTN</option>
// //                 <option value="syriatel">Syriatel</option>
// //                 <option value="bank">Bank</option>
// //                 <option value="wallet">Wallet</option>
// //               </select>

// //               {(paymentForm.provider === "mtn" ||
// //                 paymentForm.provider === "syriatel") && (
// //                 <input
// //                   type="text"
// //                   placeholder="Enter Phone Number"
// //                   value={paymentForm.phone}
// //                   onChange={(e) =>
// //                     setPaymentForm({ ...paymentForm, phone: e.target.value })
// //                   }
// //                   className="mt-2 w-full rounded border p-2"
// //                 />
// //               )}

// //               {paymentForm.provider === "wallet" && (
// //                 <input
// //                   type="email"
// //                   placeholder="Enter Wallet Email"
// //                   value={paymentForm.email}
// //                   onChange={(e) =>
// //                     setPaymentForm({ ...paymentForm, email: e.target.value })
// //                   }
// //                   className="mt-2 w-full rounded border p-2"
// //                 />
// //               )}
// //             </div>

// //             <button
// //               onClick={createBill}
// //               className="mt-3 h-10 w-full rounded-xl bg-green-500 px-4 py-2 text-white hover:bg-green-600"
// //             >
// //               Create Bill
// //             </button>

// //             {billId && (
// //               <button
// //                 onClick={payBill}
// //                 className="mt-2 h-10 w-full rounded-xl bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
// //               >
// //                 Pay
// //               </button>
// //             )}
// //           </div>

// //           {/* ملخص السعر */}
// //           <div className="border-bodyColor shadow-l flex w-full flex-col gap-4 rounded-xl border-4 p-4 md:w-1/2">
// //             <h3 className="mb-2 text-xl font-bold">Order Summary</h3>
// //             <p>Subtotal: {data?.subtotal ?? 0}$</p>
// //             {form.order_state === "in" ? (
// //               <p>Table price: {data?.table_price ?? 0}$</p>
// //             ) : (
// //               <p>Delivery price: {data?.delivery_fee ?? 0}$</p>
// //             )}
// //             <p className="font-bold text-gray-900">
// //               Total: {displayTotal ?? 0}$
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Bill;
// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Loader from "@/components/ui/loader";
// import { useBillMutation } from "@/services/billApi";
// import img1 from "../../../../assets/img/layout/leaf-branch-1.png";
// import img2 from "../../../../assets/img/layout/leaf-branch-2.png";
// import MapPicker from "./MapPicker";
// import dayjs from "dayjs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Bill() {
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?.userID ?? null;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [Bill] = useBillMutation();
//   const token = localStorage.getItem("TOKEN");

//   const [form, setForm] = useState({
//     order_state: "out",
//     order_date: "",
//     lat: "",
//     lng: "",
//   });

//   const [billId, setBillId] = useState(null);
//   const [localTotal, setLocalTotal] = useState(null);

//   const [paymentForm, setPaymentForm] = useState({
//     provider: "",
//     phone: "",
//     email: "",
//   });

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   // --- جلب السلة
//   const fetchItemCart = async () => {
//     if (!token) return;
//     try {
//       const response = await Bill();
//       const cartData = response?.data?.data || null;

//       setData(cartData);
//       if (cartData) {
//         setForm((prev) => ({
//           ...prev,
//           order_state: cartData.order_state || "out",
//           order_date: cartData.order_date || "",
//           lat: cartData.lat || "",
//           lng: cartData.lng || "",
//         }));
//         if (cartData.order_state === "in") {
//           setLocalTotal(cartData.subtotal + (cartData.table_price ?? 0));
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- تحقق كل 20 ثانية من وجود فاتورة موافق عليها
//  const checkAdminApproval = async () => {
//    if (!token || !data) return;
//    try {
//      const res = await axios.get("http://127.0.0.1:8000/api/admin/bills", {
//        headers: { Authorization: `Bearer ${token}` },
//      });
//      const bills = res.data.bills || [];

//      const approvedBill = bills.find(
//        (b) =>
//          b.user_id === userId &&
//          b.cart_id === data.cart_id &&
//          b.admin_approved_at !== null,
//      );

//      if (approvedBill) {
//        // مسح كامل للسلة والحالات المرتبطة
//        setData({ items: [], subtotal: 0, total: 0 });
//        setBillId(null);
//        setLocalTotal(null);
//        setForm({
//          order_state: "out",
//          order_date: "",
//          lat: "",
//          lng: "",
//        });
//        toast.info("✅ Your bill was approved by admin. Cart cleared.");
//      }
//    } catch (err) {
//      console.error("Error checking admin approval:", err);
//    }
//  };

//   useEffect(() => {
//     fetchItemCart();
//     const interval = setInterval(() => {
//       fetchItemCart();
//       checkAdminApproval();
//     }, 20000); // كل 20 ثانية
//     return () => clearInterval(interval);
//   }, [Bill, userId]);

//   // --- جلب آخر حجز للطلب الداخلي
//   useEffect(() => {
//     const fetchLastReservation = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/api/reservations/latest",
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         const reservation = res?.data?.reservation;
//         if (reservation && reservation.tables?.length > 0) {
//           const tablePrice = parseFloat(reservation.tables[0].price);

//           setForm((prev) => ({
//             ...prev,
//             order_date: dayjs(reservation.reservation_time).format(
//               "YYYY-MM-DDTHH:mm",
//             ),
//           }));

//           setData((prev) => ({
//             ...prev,
//             table_price: tablePrice,
//           }));

//           setLocalTotal((prev) => (data?.subtotal ?? 0) + tablePrice);
//         }
//       } catch (err) {
//         console.error(
//           "Failed fetching last reservation:",
//           err?.response?.data || err.message,
//         );
//       }
//     };

//     if (form.order_state === "in") {
//       fetchLastReservation();
//     } else {
//       setLocalTotal(null);
//     }
//   }, [form.order_state, token]);

//   // --- تحديث الموقع
//   const updateLocation = async (lat, lng) => {
//     setForm((prev) => ({ ...prev, lat, lng }));
//     if (!token || !data) return;
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/api/carts/${data.cart_id}/location`,
//         { lat, lng },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setData((prev) => ({
//         ...prev,
//         distance_km: response?.data?.distance_km,
//         delivery_fee: response?.data?.delivery_fee,
//         total: response?.data?.total,
//       }));
//       toast.success("Location updated successfully!");
//     } catch (err) {
//       console.error(
//         "Failed updating location:",
//         err?.response?.data || err.message,
//       );
//       toast.error("Error updating location.");
//     }
//   };

//   // --- تحديث الكمية
//   const updateQuantity = async (cartItemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     if (!token) return toast.error("Please log in again.");
//     try {
//       const item = data?.items?.find((i) => i.cart_item_id === cartItemId);
//       if (!item) return;

//       await axios.post(
//         `http://127.0.0.1:8000/api/carts/${data.cart_id}/${item.meal.id}/quantity`,
//         {
//           cart_id: data.cart_id,
//           meal_id: item.meal.id,
//           type_meal_id: item.type_meal?.id ?? null,
//           quantity: newQuantity,
//         },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       const response = await Bill();
//       const cartData = response?.data?.data || null;
//       setData(cartData);
//       if (form.order_state === "in") {
//         setLocalTotal(cartData?.subtotal + (cartData?.table_price ?? 0));
//       }
//       toast.success("Quantity updated successfully!");
//     } catch (err) {
//       console.error("Failed updating quantity:", err);
//       toast.error("Error updating quantity.");
//     }
//   };

//   // --- حذف عنصر
//   const deleteItem = async (cartItemId) => {
//     if (!token) return toast.error("Please log in again.");
//     try {
//       await axios.delete(
//         `http://127.0.0.1:8000/api/carts/${data.cart_id}/${cartItemId}`,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setData((prev) => ({
//         ...prev,
//         items: prev?.items?.filter((item) => item.cart_item_id !== cartItemId),
//       }));
//       toast.success("Item deleted successfully!");
//     } catch (err) {
//       console.error("Failed deleting item:", err);
//       toast.error("Error deleting item.");
//     }
//   };

//   const displayTotal =
//     form.order_state === "in" ? (localTotal ?? 0) : (data?.total ?? 0);

//   // --- إنشاء الفاتورة
//   const createBill = async () => {
//     if (!token) return toast.error("Please log in again.");
//     if (!data) return;

//     if (!paymentForm.provider)
//       return toast.error("Please select a payment method.");
//     if (
//       (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") &&
//       !paymentForm.phone
//     ) {
//       return toast.error("Please enter a phone number.");
//     }
//     if (paymentForm.provider === "wallet" && !paymentForm.email) {
//       return toast.error("Please enter a wallet email.");
//     }

//     const payload = {
//       ...(form.order_state === "in"
//         ? { order_date: form.order_date, order_state: "in" }
//         : {
//             order_date: form.order_date,
//             order_state: "out",
//             lat: form.lat,
//             lng: form.lng,
//           }),
//       payment_method: paymentForm.provider,
//       grand_total: displayTotal,
//     };

//     try {
//       const res = await axios.post(
//         `http://127.0.0.1:8000/api/bills/${data.cart_id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setBillId(res?.data?.bill?.id);
//       toast.success(
//         "Bill created successfully. Waiting for admin approval before clearing the cart.",
//       );
//     } catch (err) {
//       console.error(
//         "Failed creating bill:",
//         err?.response?.data || err.message,
//       );
//       toast.error("Failed to create bill.");
//     }
//   };

//   // --- الدفع
//   const payBill = async () => {
//     if (!token) return toast.error("Please log in again.");
//     if (!billId) return toast.error("Please create a bill first.");

//     const payload = { provider: paymentForm.provider };
//     if (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") {
//       payload.phone = paymentForm.phone;
//     } else if (paymentForm.provider === "wallet") {
//       payload.email = paymentForm.email;
//     }

//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/payments/${billId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       toast.info(
//         "Payment request sent. Waiting for admin approval. Cart will not be cleared until approval.",
//       );
//     } catch (err) {
//       console.error("Failed payment:", err?.response?.data || err.message);
//       toast.error("Payment failed.");
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <div className="text-lg text-red-500">Error: {error}</div>;
//   if (!data || !data.items || data.items.length === 0)
//     return (
//       <p className="mt-10 text-center text-xl text-gray-500">
//         Your cart is empty.
//       </p>
//     );

//   return (
//     <div className="relative p-6">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
//       <img src={img1} className="absolute top-[75%] left-[94%] h-28" />

//       {/* جدول المنتجات */}
//       <div
//         className="rounded-2xl border-4 border-red-200 bg-red-50 p-5 text-2xl shadow-lg"
//         data-aos="fade-up"
//       >
//         <div className="space-y-3">
//           <div className="flex h-20 items-center justify-between rounded-xl bg-white p-3 font-bold shadow-sm">
//             <div>Image</div>
//             <h3 className="mx-14">
//               Meal <br /> Type
//             </h3>
//             <p>Price</p>
//             <div>Quantity</div>
//             <p>Total price</p>
//           </div>

//           {data.items.map((item) => (
//             <div
//               key={item.cart_item_id}
//               className="mb-2 flex h-28 items-center justify-between rounded-xl bg-white p-3 shadow-sm"
//             >
//               <img
//                 src={`http://127.0.0.1:8000/storage/${item.type_meal?.image ?? item.meal.image}`}
//                 alt={item.meal.type}
//                 className="h-24 w-24 rounded-lg object-cover"
//               />
//               <div>
//                 <h3>{item.meal.type}</h3>
//                 {item.type_meal && <p>{item.type_meal.name}</p>}
//               </div>
//               <p>{item.type_meal?.price ?? item.price_per_item}$</p>
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) =>
//                   updateQuantity(item.cart_item_id, parseInt(e.target.value))
//                 }
//                 className="w-16 rounded border p-1 text-center"
//               />
//               <p>{item.total_price_per_item}$</p>
//               <button
//                 onClick={() => deleteItem(item.cart_item_id)}
//                 className="rounded"
//               >
//                 <i className="ri-delete-bin-5-line cursor-pointer text-2xl text-red-500"></i>
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* خيارات الطلب والدفع */}
//         <div className="mt-5 flex flex-col gap-5 md:flex-row">
//           <div className="flex w-full flex-col gap-4 md:w-1/2">
//             <h3 className="text-xl font-bold">Complete Order</h3>
//             <div className="mb-1 flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setForm({ ...form, order_state: "in" })}
//                 className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "in" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
//               >
//                 Internal
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setForm({ ...form, order_state: "out" })}
//                 className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "out" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
//               >
//                 Delivery
//               </button>
//             </div>

//             {form.order_state === "out" && (
//               <>
//                 <input
//                   type="datetime-local"
//                   min={dayjs().format("YYYY-MM-DDTHH:mm")}
//                   value={form.order_date}
//                   onChange={(e) =>
//                     setForm({ ...form, order_date: e.target.value })
//                   }
//                   className="mb-2 w-full rounded border p-2"
//                 />
//                 <MapPicker onSelect={updateLocation} />
//               </>
//             )}

//             {/* خيارات الدفع */}
//             <div className="mt-2">
//               <select
//                 value={paymentForm.provider}
//                 onChange={(e) =>
//                   setPaymentForm({ ...paymentForm, provider: e.target.value })
//                 }
//                 className="mb-2 w-full rounded border p-2"
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="mtn">MTN</option>
//                 <option value="syriatel">Syriatel</option>
//                 <option value="wallet">Wallet</option>
//               </select>
//               {(paymentForm.provider === "mtn" ||
//                 paymentForm.provider === "syriatel") && (
//                 <input
//                   type="tel"
//                   placeholder="Phone number"
//                   value={paymentForm.phone}
//                   onChange={(e) =>
//                     setPaymentForm({ ...paymentForm, phone: e.target.value })
//                   }
//                   className="mb-2 w-full rounded border p-2"
//                 />
//               )}
//               {paymentForm.provider === "wallet" && (
//                 <input
//                   type="email"
//                   placeholder="Wallet email"
//                   value={paymentForm.email}
//                   onChange={(e) =>
//                     setPaymentForm({ ...paymentForm, email: e.target.value })
//                   }
//                   className="mb-2 w-full rounded border p-2"
//                 />
//               )}
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={createBill}
//                 className="w-full rounded-xl bg-green-500 p-3 font-bold text-white hover:bg-green-600"
//               >
//                 Create Bill
//               </button>
//               <button
//                 onClick={payBill}
//                 className="w-full rounded-xl bg-blue-500 p-3 font-bold text-white hover:bg-blue-600"
//               >
//                 Pay
//               </button>
//             </div>
//           </div>

//           {/* ملخص السعر */}
//           <div className="w-full rounded-2xl border-4 border-red-200 bg-red-50 p-5 md:w-1/2">
//             <h3 className="mb-3 text-xl font-bold">Summary</h3>
//             <p>Subtotal: {data.subtotal}$</p>
//             {form.order_state === "in" && (
//               <p>Table: {data.table_price ?? 0}$</p>
//             )}
//             {form.order_state === "out" && (
//               <p>Delivery Fee: {data.delivery_fee ?? 0}$</p>
//             )}
//             <p className="mt-2 font-bold">Total: {displayTotal}$</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Bill;
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "@/components/ui/loader";
import { useBillMutation } from "@/services/billApi";
import img1 from "../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../assets/img/layout/leaf-branch-2.png";
import MapPicker from "./MapPicker";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bill() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userID ?? null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Bill] = useBillMutation();
  const token = localStorage.getItem("TOKEN");

  const [form, setForm] = useState({
    order_state: "out",
    order_date: "",
    lat: "",
    lng: "",
  });

  const [billId, setBillId] = useState(null);
  const [localTotal, setLocalTotal] = useState(null);

  const [paymentForm, setPaymentForm] = useState({
    provider: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    AOS.init();
  }, []);

  // جلب السلة
  const fetchItemCart = async () => {
    if (!token) return;
    try {
      const response = await Bill();
      const cartData = response?.data?.data || null;

      setData(cartData);

      if (cartData) {
        setForm((prev) => ({
          ...prev,
          order_state: cartData.order_state || "out",
          order_date: cartData.order_date || "",
          lat: cartData.lat || "",
          lng: cartData.lng || "",
        }));
        if (cartData.order_state === "in") {
          setLocalTotal(cartData.subtotal + (cartData.table_price ?? 0));
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // التحقق من موافقة الأدمين كل 20 ثانية
  // const checkAdminApproval = async () => {
  //   if (!token || !data) return;
  //   try {
  //     const res = await axios.get("http://127.0.0.1:8000/api/admin/bills", {
  //       // headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const bills = res.data.bills || [];

  //     const approvedBill = bills.find(
  //       (b) =>
  //         b.user_id === userId &&
  //         b.cart_id === data.cart_id &&
  //         b.admin_approved_at !== null,
  //     );

  //     if (approvedBill) {
  //       // تفريغ السلة بالكامل
  //       setData({ items: [], subtotal: 0, total: 0 });
  //       setBillId(null);
  //       setLocalTotal(null);
  //       setForm({
  //         order_state: "out",
  //         order_date: "",
  //         lat: "",
  //         lng: "",
  //       });
  //       toast.info("✅ Your bill was approved by admin. Cart cleared.");
  //     }
  //   } catch (err) {
  //     console.error("Error checking admin approval:", err);
  //   }
  // };
  // دالة لتفريغ السلة
  const clearCart = async () => {
    if (!token) return alert("يرجى تسجيل الدخول مجددًا");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${data.cart_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // إعادة تهيئة حالة السلة
      setData({ items: [], subtotal: 0, total: 0 });
      setBillId(null);
      setLocalTotal(null);
      setForm({
        order_state: "out",
        order_date: "",
        lat: "",
        lng: "",
      });
      toast.success("✅ تم تفريغ السلة بنجاح بعد موافقة المسؤول.");
    } catch (err) {
      console.error("فشل إفراغ السلة:", err);
      alert("حدث خطأ أثناء إفراغ السلة.");
    }
  };

  // دالة للتحقق من حالة الموافقة من المسؤول
  const checkAdminApproval = async () => {
    if (!token || !data) return;

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/bills", {
        // headers: { Authorization: `Bearer ${token}` }, // إذا تحتاج التوكن
      });

      const bills = res.data.bills || [];

      // البحث عن الفاتورة الخاصة بالمستخدم الحالية
      const myBill = bills.find(
        (b) => b.user_id === userId && b.cart_id === data.cart_id,
      );

      if (!myBill) return; // إذا ما في فاتورة، لا نفعل شيء

      // التحقق من حالة الموافقة
      if (myBill.payment_status === "paid") {
        // تم الموافقة → تفريغ السلة
        await clearCart();
      } else if (myBill.payment_status === "failed") {
        // تم الرفض → عرض رسالة
        toast.error("❌ تم رفض الفاتورة من قبل المسؤول.");
      }
      // إذا لا شيء → لا نفعل أي شيء
    } catch (err) {
      console.error("خطأ أثناء التحقق من الموافقة:", err);
    }
  };

  useEffect(() => {
    fetchItemCart();
    const interval = setInterval(() => {
      // fetchItemCart();
      checkAdminApproval();
      console.log("10");
    }, 10000); // كل 20 ثانية
    return () => clearInterval(interval);
  }, [Bill, userId]);

  // جلب آخر حجز للطلب الداخلي
  useEffect(() => {
    const fetchLastReservation = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/reservations/latest",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const reservation = res?.data?.reservation;
        if (reservation && reservation.tables?.length > 0) {
          const tablePrice = parseFloat(reservation.tables[0].price);
          setForm((prev) => ({
            ...prev,
            order_date: dayjs(reservation.reservation_time).format(
              "YYYY-MM-DDTHH:mm",
            ),
          }));
          setData((prev) => ({
            ...prev,
            table_price: tablePrice,
          }));
          setLocalTotal((prev) => (data?.subtotal ?? 0) + tablePrice);
          const interval = setInterval(() => {
            // fetchItemCart();
            checkAdminApproval();
            console.log("10");
          }, 10000); // كل 20 ثانية
        }
      } catch (err) {
        console.error(
          "Failed fetching last reservation:",
          err?.response?.data || err.message,
        );
      }
    };

    if (form.order_state === "in") {
      fetchLastReservation();
    } else {
      setLocalTotal(null);
    }
  }, [form.order_state, token]);
  //  const clearCart = async () => {
  //     if (!token) return alert("يرجى تسجيل الدخول مجدداً");
  //     try {
  //       await axios.delete(`http://127.0.0.1:8000/api/cart/${data.cart_id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setData(null);
  //     } catch (err) {
  //       console.error("فشل إفراغ السلة:", err);
  //       alert("حدث خطأ أثناء إفراغ السلة.");
  //     }
  //   };
  // تحديث الموقع
  const updateLocation = async (lat, lng) => {
    setForm((prev) => ({ ...prev, lat, lng }));
    if (!token || !data) return;
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/carts/${data.cart_id}/location`,
        { lat, lng },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setData((prev) => ({
        ...prev,
        distance_km: response?.data?.distance_km,
        delivery_fee: response?.data?.delivery_fee,
        total: response?.data?.total,
      }));
      toast.success("Location updated successfully!");
    } catch (err) {
      console.error(
        "Failed updating location:",
        err?.response?.data || err.message,
      );
      toast.error("Error updating location.");
    }
  };

  // تحديث الكمية
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    if (!token) return toast.error("Please log in again.");
    try {
      const item = data?.items?.find((i) => i.cart_item_id === cartItemId);
      if (!item) return;
      await axios.post(
        `http://127.0.0.1:8000/api/carts/${data.cart_id}/${item.meal.id}/quantity`,
        {
          cart_id: data.cart_id,
          meal_id: item.meal.id,
          type_meal_id: item.type_meal?.id ?? null,
          quantity: newQuantity,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const response = await Bill();
      const cartData = response?.data?.data || null;
      setData(cartData);
      if (form.order_state === "in") {
        setLocalTotal(cartData?.subtotal + (cartData?.table_price ?? 0));
      }
      // toast.success("Quantity updated successfully!");
    } catch (err) {
      console.error("Failed updating quantity:", err);
      // toast.error("Error updating quantity.");
    }
  };

  // حذف عنصر
  const deleteItem = async (cartItemId) => {
    if (!token) return toast.error("Please log in again.");
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/carts/${data.cart_id}/${cartItemId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setData((prev) => ({
        ...prev,
        items: prev?.items?.filter((item) => item.cart_item_id !== cartItemId),
      }));
      toast.success("Item deleted successfully!");
    } catch (err) {
      console.error("Failed deleting item:", err);
      toast.error("Error deleting item.");
    }
  };

  const displayTotal =
    form.order_state === "in" ? (localTotal ?? 0) : (data?.total ?? 0);

  // إنشاء الفاتورة
  const createBill = async () => {
    if (!token) return toast.error("Please log in again.");
    if (!data) return;
    if (!paymentForm.provider)
      return toast.error("Please select a payment method.");
    if (
      (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") &&
      !paymentForm.phone
    )
      return toast.error("Please enter a phone number.");
    if (paymentForm.provider === "wallet" && !paymentForm.email)
      return toast.error("Please enter a wallet email.");

    const payload = {
      ...(form.order_state === "in"
        ? { order_date: form.order_date, order_state: "in" }
        : {
            order_date: form.order_date,
            order_state: "out",
            lat: form.lat,
            lng: form.lng,
          }),
      payment_method: paymentForm.provider,
      grand_total: displayTotal,
    };

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/bills/${data.cart_id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setBillId(res?.data?.bill?.id);
      toast.success(
        "Bill created successfully. Waiting for admin approval before clearing the cart.",
      );
    } catch (err) {
      console.error(
        "Failed creating bill:",
        err?.response?.data || err.message,
      );
      toast.error("Failed to create bill.");
    }
  };

  // دفع الفاتورة
  const payBill = async () => {
    if (!token) return toast.error("Please log in again.");
    if (!billId) return toast.error("Please create a bill first.");

    const payload = { provider: paymentForm.provider };
    if (paymentForm.provider === "mtn" || paymentForm.provider === "syriatel") {
      payload.phone = paymentForm.phone;
    } else if (paymentForm.provider === "wallet") {
      payload.email = paymentForm.email;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/payments/${billId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.info(
        "Payment request sent. Waiting for admin approval. Cart will not be cleared until approval.",
      );
    } catch (err) {
      console.error("Failed payment:", err?.response?.data || err.message);
      toast.error("Payment failed.");
    }
  };

  if (loading)
    return (
      <div className="my-12">
        <Loader />
      </div>
    );
  if (error) return <div className="text-lg text-red-500">Error: {error}</div>;
  if (!data || !data.items || data.items.length === 0)
    return (
      <p className="mt-10 text-center text-xl text-gray-500">
        Your cart is empty.
      </p>
    );

  return (
    <div className="relative p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <img src={img2} className="absolute top-[15%] left-[0%] h-28" />
      <img src={img1} className="absolute top-[75%] left-[94%] h-28" />

      {/* جدول المنتجات */}
      <div
        className="rounded-2xl border-4 border-red-200 bg-red-50 p-5 text-2xl shadow-lg"
        data-aos="fade-up"
      >
        <div className="space-y-3">
          <div className="flex h-20 items-center justify-between rounded-xl bg-white p-3 font-bold shadow-sm">
            <div>Image</div>
            <h3 className="mx-14">
              Meal <br /> Type
            </h3>
            <p>Price</p>
            <div>Quantity</div>
            <p>Total price</p>
            <button
              onClick={clearCart}
              className="mt-2 rounded px-3 py-1 text-white"
            >
              ❌
            </button>
          </div>

          {data.items.map((item) => (
            <div
              key={item.cart_item_id}
              className="mb-2 flex h-28 items-center justify-between rounded-xl bg-white p-3 shadow-sm"
            >
              <img
                src={`http://127.0.0.1:8000/storage/${item.type_meal?.image ?? item.meal.image}`}
                alt={item.meal.type}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div>
                <h3>{item.meal.type}</h3>
                {item.type_meal && <p>{item.type_meal.name}</p>}
              </div>
              <p>{item.type_meal?.price ?? item.price_per_item}$</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.cart_item_id, parseInt(e.target.value))
                }
                className="w-16 rounded border p-1 text-center"
              />
              <p>{item.total_price_per_item}$</p>
              <button
                onClick={() => deleteItem(item.cart_item_id)}
                className="rounded"
              >
                <i className="ri-delete-bin-5-line cursor-pointer text-2xl text-red-500"></i>
              </button>
            </div>
          ))}
        </div>

        {/* خيارات الطلب والدفع */}
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <h3 className="text-xl font-bold">Complete Order</h3>
            <div className="mb-1 flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, order_state: "in" })}
                className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "in" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
              >
                Internal
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, order_state: "out" })}
                className={`flex-1 rounded-xl px-4 py-1 text-white ${form.order_state === "out" ? "bg-red-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
              >
                Delivery
              </button>
            </div>

            {form.order_state === "out" && (
              <>
                <input
                  type="datetime-local"
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  value={form.order_date}
                  onChange={(e) =>
                    setForm({ ...form, order_date: e.target.value })
                  }
                  className="mb-2 w-full rounded border p-2"
                />
                <MapPicker onSelect={updateLocation} />
              </>
            )}

            {/* خيارات الدفع */}
            <div className="mt-2">
              <select
                value={paymentForm.provider}
                onChange={(e) =>
                  setPaymentForm({
                    provider: e.target.value,
                    phone: "",
                    email: "",
                  })
                }
                className="w-full rounded border p-2"
              >
                <option value="">-- Choose payment method--</option>
                <option value="mtn">MTN</option>
                <option value="syriatel">Syriatel</option>
                <option value="bank">Al Baraka Bank</option>
                <option value="wallet">Wallet</option>
              </select>

              {(paymentForm.provider === "mtn" ||
                paymentForm.provider === "syriatel") && (
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={paymentForm.phone}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, phone: e.target.value })
                  }
                  className="mt-2 w-full rounded border p-2"
                />
              )}

              {paymentForm.provider === "wallet" && (
                <input
                  type="email"
                  placeholder="Enter Wallet Email"
                  value={paymentForm.email}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, email: e.target.value })
                  }
                  className="mt-2 w-full rounded border p-2"
                />
              )}
            </div>

            <button
              onClick={createBill}
              className="mt-3 h-10 w-full rounded-xl bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Create Bill
            </button>

            {billId && (
              <button
                onClick={payBill}
                className="mt-2 h-10 w-full rounded-xl bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                Pay
              </button>
            )}
          </div>

          {/* ملخص السعر */}
          <div className="border-bodyColor shadow-l flex w-full flex-col gap-4 rounded-xl border-4 p-4 md:w-1/2">
            <h3 className="mb-2 text-xl font-bold">Order Summary</h3>
            <p>Subtotal: {data?.subtotal ?? 0}$</p>
            {form.order_state === "in" ? (
              <p>Table price: {data?.table_price ?? 0}$</p>
            ) : (
              <p>Delivery price: {data?.delivery_fee ?? 0}$</p>
            )}
            <p className="font-bold text-gray-900">
              Total: {displayTotal ?? 0}$
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;

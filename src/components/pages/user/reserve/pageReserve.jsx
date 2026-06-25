

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

import imag2 from "../../../../assets/img/reserve/c438ea6dc8c0a47315ec2812c3033b8a (1).jpg";
import imag3 from "../../../../assets/img/reserve/39979552aa0a347705d6313e25df90b6.jpg";
import img1 from "../../../../assets/img/layout/leaf-branch-1.png";
import img2 from "../../../../assets/img/layout/leaf-branch-2.png";

import TextField from "../../../ui/form/textField";
import Button from "../../../ui/button";
import "aos/dist/aos.css";

function PageReserve() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [availableTables, setAvailableTables] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const [usedMultipleTables, setUsedMultipleTables] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);

  const durations = [
    { value: "30min", label: "30 min" },
    { value: "1h", label: "1 hour" },
    { value: "1h30", label: "1.5 hours" },
    { value: "2h", label: "2 hours" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDuration, setHoveredDuration] = useState("");
  const dropdownRef = useRef(null);

  const handleSubmit = async (values) => {
    if (!user) {
      toast.error("Please log in first.", { position: "top-right" });
      return;
    }

    try {
      const token = localStorage.getItem("TOKEN");
      const reservationStart = dayjs(values.time);

      let durationMinutes = 30;
      switch (values.duration) {
        case "30min":
          durationMinutes = 30;
          break;
        case "1h":
          durationMinutes = 60;
          break;
        case "1h30":
          durationMinutes = 90;
          break;
        case "2h":
          durationMinutes = 120;
          break;
      }

      const reservationEnd = reservationStart.add(durationMinutes, "minute");

      // Try to create reservation
      const reservationRes = await axios.post(
        "http://127.0.0.1:8000/api/reservations",
        {
          reservation_time: reservationStart.format("YYYY-MM-DDTHH:mm:ss"),
          reservation_end_time: reservationEnd.format("YYYY-MM-DDTHH:mm:ss"),
          phone: values.phone,
          people_count: Number(values.count),
          special_requests: values.special_requests,
          is_full_restaurant: values.full_restaurant,
          is_special_event: values.special_event ? 1 : 0,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const reservationData = reservationRes.data;
      setReservationId(reservationData.id);

      // Reset state
      setAvailableTables([]);
      setSelectedTables([]);
      setUsedMultipleTables(false);

      // Success toast
      toast.success(
        reservationRes.data.message || "Reservation created successfully!",
        {
          duration: 5000,
          position: "top-right",
        },
      );

      // Fetch available tables if not full restaurant
      if (!values.full_restaurant) {
        const tablesRes = await axios.get(
          "http://127.0.0.1:8000/api/tables/available",
          {
            params: {
              reservation_time: reservationStart.format("YYYY-MM-DDTHH:mm:ss"),
              reservation_end_time: reservationEnd.format(
                "YYYY-MM-DDTHH:mm:ss",
              ),
              people_count: Number(values.count),
              is_special_event: values.special_event ? 1 : 0,
            },
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        let tables = tablesRes.data;

        if (!tables || tables.length === 0) {
          const groupRes = await axios.get(
            "http://127.0.0.1:8000/api/tables/available-for-group",
            {
              params: {
                reservation_time: reservationStart.format(
                  "YYYY-MM-DDTHH:mm:ss",
                ),
                reservation_end_time: reservationEnd.format(
                  "YYYY-MM-DDTHH:mm:ss",
                ),
                people_count: Number(values.count),
                is_special_event: values.special_event ? 1 : 0,
              },
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          tables = groupRes.data.tables;
          setUsedMultipleTables(true);
        } else {
          setUsedMultipleTables(false);
        }

        setAvailableTables(tables);
      }
    } catch (error) {
      console.error("Reservation or fetching tables failed:", error);

      const message =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data, null, 2) ||
        "An error occurred during the process.";

      toast.error(message, { duration: 5000, position: "top-right" });

      // Reset state
      setReservationId(null);
      setAvailableTables([]);
      setSelectedTables([]);
      setUsedMultipleTables(false);
    }
  };

  const handleConfirmTables = async () => {
    if (!reservationId || selectedTables.length === 0) {
      toast.error("Please select at least one table to confirm.", {
        position: "top-right",
      });
      return;
    }
    try {
      const token = localStorage.getItem("TOKEN");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/reservations/${reservationId}/tables`,
        { table_ids: selectedTables },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message || "Reservation confirmed successfully!", {
        duration: 5000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Failed to confirm tables:", error);
      const message =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data, null, 2) ||
        "Failed to confirm tables.";
      toast.error(message, { duration: 5000, position: "top-right" });
    }
  };

  const toggleTableSelection = (id) => {
    setSelectedTables((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="background relative -top-18 flex min-h-screen flex-col items-center justify-center px-4">
      {/* Global toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* UI Layout */}
      <img
        src={img2}
        className="absolute top-[15%] left-0 h-16 md:h-24 lg:h-28"
      />
      <img
        src={img1}
        className="absolute top-[75%] right-0 h-16 md:h-24 lg:h-28"
      />
      <img
        className="relative top-15 right-48 z-20 size-20 rounded-2xl sm:right-62 sm:size-24 md:right-80 md:size-30 lg:right-96"
        src={imag2}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:max-w-2xl lg:max-w-3xl">
        <h1 className="font-Carter text-textColor pt-4 text-center text-2xl font-semibold md:text-3xl lg:text-4xl">
          Reserve
        </h1>

        <Formik
          initialValues={{
            time: "",
            phone: "",
            count: 1,
            special_requests: "",
            special_event: false,
            full_restaurant: false,
            duration: "30min",
          }}
          validationSchema={Yup.object({
            time: Yup.string().required("Please select a reservation time."),
            phone: Yup.string()
              .matches(/^[0-9]{10,15}$/, "Invalid phone number.")
              .required("Please enter your phone number."),
            count: Yup.number()
              .min(1, "Number of people must be at least 1.")
              .required("Please enter the number of people."),
            special_requests: Yup.string(),
            special_event: Yup.boolean(),
            full_restaurant: Yup.boolean().required(),
            duration: Yup.string().required("Please select a duration."),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-3 flex flex-col gap-3 md:flex-row">
                <div className="w-full md:w-1/2">
                  <TextField
                    type="datetime-local"
                    name="time"
                    icon="ri-time-line"
                    min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  />
                  <ErrorMessage
                    name="time"
                    component="p"
                    className="text-firstColor text-sm md:text-base"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <TextField type="tel" name="phone" icon="ri-phone-line" />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-firstColor text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-3 md:flex-row">
                <div className="w-full md:w-1/2">
                  <TextField
                    type="number"
                    name="count"
                    icon="ri-group-line"
                    min={1}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                  <ErrorMessage
                    name="count"
                    component="p"
                    className="text-firstColor text-sm md:text-base"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <TextField
                    type="text"
                    name="special_requests"
                    icon="ri-edit-2-line"
                  />
                </div>
              </div>

              {/* Duration Dropdown */}
              <div className="relative mb-3" ref={dropdownRef}>
                <label className="text-sm md:text-base">Duration</label>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="my-2 flex w-full cursor-pointer justify-between rounded border-2 border-red-200 p-2 text-lg font-medium shadow-sm select-none"
                >
                  {durations.find((d) => d.value === values.duration)?.label ||
                    "Select Duration"}
                  <i className="ri-corner-down-left-line text-red-500"></i>
                </div>
                {isOpen && (
                  <div className="absolute z-10 w-full overflow-hidden rounded border-2 border-red-200 bg-white shadow-md">
                    {durations.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          setFieldValue("duration", item.value);
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setHoveredDuration(item.label)}
                        onMouseLeave={() => setHoveredDuration("")}
                        className={`cursor-pointer p-2 text-lg hover:bg-red-500 hover:text-white ${
                          hoveredDuration === item.label
                            ? "bg-red-500 text-white"
                            : ""
                        }`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-3 flex flex-col gap-3 md:flex-row">
                <div className="flex items-center gap-2">
                  <Field type="checkbox" name="special_event" />
                  <label
                    htmlFor="special_event"
                    className="text-sm md:text-base"
                  >
                    Special Event
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Field type="checkbox" name="full_restaurant" />
                  <label
                    htmlFor="full_restaurant"
                    className="text-sm md:text-base"
                  >
                    Full Restaurant
                  </label>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  title="Reserve"
                  className="mt-4 px-6 py-2 text-sm md:text-base lg:text-lg"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <img
        className="relative -top-22 left-48 z-10 mt-6 size-20 rounded-2xl sm:left-62 sm:size-24 md:left-80 md:size-30 lg:left-96"
        src={imag3}
      />

      {reservationId && (
        <div className="mt-6 text-lg font-semibold text-green-700 md:text-xl">
          Reservation ID: {reservationId}
        </div>
      )}

      {usedMultipleTables && (
        <div className="mt-4 text-center text-sm font-semibold text-yellow-600 md:text-base">
          Multiple tables were combined to fit your group.
        </div>
      )}

      {availableTables.length > 0 && reservationId && (
        <div className="mt-6 w-full max-w-lg rounded-xl bg-white p-4 shadow-lg md:max-w-2xl lg:max-w-3xl">
          <h2 className="mb-4 text-center text-lg font-bold text-gray-800 md:text-2xl">
            Confirm your table
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {availableTables.map((table) => (
              <li
                key={table.id}
                onClick={() => toggleTableSelection(table.id)}
                className={`cursor-pointer rounded border p-3 shadow-md transition ${
                  selectedTables.includes(table.id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <p className="text-sm md:text-base">
                  <strong>ID:</strong> {table.id}
                </p>
                <p className="text-sm md:text-base">
                  <strong>Capacity:</strong> {table.capacity}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button
              title="Confirm Tables"
              onClick={handleConfirmTables}
              className="bg-green-600 px-6 py-2 text-sm text-white hover:bg-green-700 md:text-base lg:text-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PageReserve;

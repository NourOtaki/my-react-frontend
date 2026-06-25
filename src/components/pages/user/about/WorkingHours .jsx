import React from "react";

const WorkingHours = () => {
  const maxPeople = 150;
  const fromTime = "8:00 AM";
  const toTime = "1:00 AM";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-bodyColor-600 to-red-400 p-6">
      <div className="w-full max-w-md rounded-xl bg-gradient-to-r from-bodyColor-700 via-from-bodyColor-600 to-red-400 p-10 text-center text-white shadow-xl">
        <h2 className="mb-6 text-3xl font-bold">Working Hours</h2>
        <p className="mb-4 text-xl">
          From <span className="text-2xl font-extrabold">{fromTime}</span> to{" "}
          <span className="text-2xl font-extrabold">{toTime}</span>
        </p>
        <p className="text-xl">
          Maximum{" "}
          <span className="text-2xl font-extrabold">{maxPeople} People</span>
        </p>
      </div>
    </div>
  );
};

export default WorkingHours;

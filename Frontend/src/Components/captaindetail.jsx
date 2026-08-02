
import React, { useContext } from "react";

import {
  Clock3,
  IndianRupee,
  Star,
  CarFront,
} from "lucide-react";

export const CaptainDetails = ({ captains }) => {
  if (!captains) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
  <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-6 text-white shadow-2xl">

    {/* Top */}
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
          <img
            src={`https://ui-avatars.com/api/?name=${captains.firstName}+${captains.lastName}&background=0f172a&color=fff&size=200`}
            alt=""
            className="h-16 w-16 rounded-2xl"
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold capitalize">
            {captains.firstName} {captains.lastName}
          </h2>

          <p className="mt-1 text-sm text-slate-300">
            RideFlow Captain
          </p>

          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              captains.status === "ONLINE"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {captains.status}
          </span>

        </div>

      </div>

      <div className="rounded-2xl bg-white/10 px-5 py-3 text-center backdrop-blur">

        <p className="text-xs uppercase tracking-widest text-slate-300">
          Rating
        </p>

        <h2 className="mt-1 flex items-center justify-center gap-1 text-3xl font-bold">
          ⭐ {captains.rating}
        </h2>

      </div>

    </div>

    {/* Divider */}

    <div className="my-6 h-px bg-white/10" />

    {/* Vehicle */}

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm text-slate-300">
          Vehicle
        </p>

        <h2 className="mt-1 text-2xl font-bold capitalize">
          {captains.vehicleColour} {captains.vehicleType}
        </h2>

        <p className="mt-2 text-slate-300">
          {captains.vehiclePlate}
        </p>

      </div>

      <div className="flex flex-col items-center">

        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <CarFront size={38} />
        </div>

        <span className="mt-3 rounded-full bg-cyan-400/20 px-4 py-1 text-sm font-medium text-cyan-200">
          {captains.vehicleCapacity} Seats
        </span>

      </div>

    </div>

  </div>
);

};
import React, { useContext } from "react";
import {
  Clock3,
  IndianRupee,
  Star,
  CarFront,
} from "lucide-react";

const CaptainDetails = () => {

  return (
    <div>

      {/* Driver Card */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
            className="h-16 w-16 rounded-2xl object-cover shadow-md"
          />

          <div>

            <h2 className="text-xl font-bold capitalize">
              {/* {captain.fullname.firstname} {captain.fullname.lastname} */}
            </h2>

            <p className="text-sm text-gray-500">
              RideFlow Captain
            </p>

          </div>

        </div>

        <div className="rounded-2xl bg-cyan-50 px-5 py-3 text-center">

          <h2 className="flex items-center justify-center text-2xl font-bold text-cyan-700">
            ₹295
          </h2>

          <p className="text-xs text-gray-500">
            Today's Earnings
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        {/* Online */}

        <div className="rounded-2xl border bg-gray-50 p-5">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
            <Clock3 className="text-cyan-700" />
          </div>

          <h2 className="text-2xl font-bold">
            10.2
          </h2>

          <p className="text-sm text-gray-500">
            Hours Online
          </p>

        </div>

        {/* Trips */}

        <div className="rounded-2xl border bg-gray-50 p-5">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <CarFront className="text-green-700" />
          </div>

          <h2 className="text-2xl font-bold">
            18
          </h2>

          <p className="text-sm text-gray-500">
            Trips Today
          </p>

        </div>

        {/* Rating */}

        <div className="rounded-2xl border bg-gray-50 p-5">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
            <Star className="fill-yellow-500 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold">
            4.9
          </h2>

          <p className="text-sm text-gray-500">
            Rating
          </p>

        </div>

        {/* Earnings */}

        <div className="rounded-2xl border bg-gray-50 p-5">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
            <IndianRupee className="text-violet-700" />
          </div>

          <h2 className="text-2xl font-bold">
            ₹5.6K
          </h2>

          <p className="text-sm text-gray-500">
            This Week
          </p>

        </div>

      </div>

      {/* Vehicle */}

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-white">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-cyan-100">
              Your Vehicle
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {/* {captain.vehicle?.vehicleType || "Car"} */}
            </h2>

            <p className="text-sm text-cyan-100">
              {/* {captain.vehicle?.plate || "DL 01 AB 1234"} */}
            </p>

          </div>

          <CarFront size={42} />

        </div>

      </div>

    </div>
  );
};

export default CaptainDetails;
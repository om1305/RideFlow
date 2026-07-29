import React from "react";
import { LoaderCircle, MapPin, Navigation, Car } from "lucide-react";

export default function LookingForDriver() {
  return (
    <div className="h-[60vh] rounded-t-3xl bg-white">

      {/* Handle */}
      <div className="flex justify-center pt-3">
        <div className="h-1.5 w-14 rounded-full bg-gray-300"></div>
      </div>

      <div className="px-6 py-5">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center">
          Finding your ride...
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Looking for the nearest driver
        </p>

        {/* Loader */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-50">
            <LoaderCircle
              size={55}
              className="animate-spin text-cyan-500"
            />
          </div>
        </div>

        {/* Vehicle */}
        <div className="mt-10 flex items-center justify-between rounded-2xl border p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100">
              <Car size={30} className="text-cyan-600" />
            </div>

            <div>
              <h3 className="font-semibold">
                RideFlow Go
              </h3>

              <p className="text-sm text-gray-500">
                4 Seats
              </p>
            </div>

          </div>

          <h2 className="text-xl font-bold">
            ₹185
          </h2>

        </div>

        {/* Pickup */}
        {/* <div className="mt-8 flex items-start gap-4 border-b pb-4">

          <div className="rounded-full bg-gray-100 p-3">
            <MapPin size={20} />
          </div>

          <div>
            <h4 className="font-semibold">
              Connaught Place
            </h4>

            <p className="text-sm text-gray-500">
              New Delhi, Delhi
            </p>
          </div>

        </div> */}

        {/* Destination */}
        {/* <div className="flex items-start gap-4 pt-4">

          <div className="rounded-full bg-gray-100 p-3">
            <Navigation size={20} />
          </div>

          <div>
            <h4 className="font-semibold">
              India Gate
            </h4>

            <p className="text-sm text-gray-500">
              Rajpath, New Delhi
            </p>
          </div>

        </div> */}

      </div>

    </div>
  );
}
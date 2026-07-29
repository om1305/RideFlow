import React from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const FinishRide = () => {
  return (
    <div className="h-[40vh] rounded-t-[32px] h-[100%] bg-white px-6 py-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Finish Ride
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Confirm that you've safely dropped off the passenger.
          </p>
        </div>

        <button
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronDown size={24} />
        </button>

      </div>

      {/* Success Icon */}
      <div className="mt-8 flex justify-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={52}
            className="text-green-600"
          />
        </div>

      </div>

      {/* Text */}
      <div className="mt-6 text-center">

        <h3 className="text-xl font-semibold">
          Ready to complete the ride?
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Once completed, this trip will be added to your earnings.
        </p>

      </div>

      {/* Button */}
      <button
        className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
      >
        Finish Ride
      </button>

    </div>
  );
};

export default FinishRide;
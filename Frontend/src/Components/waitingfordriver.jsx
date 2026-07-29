import React from "react";
import {
  ChevronDown,
  MapPin,
  Navigation,
  IndianRupee,
  Phone,
  Car,
} from "lucide-react";

const WaitingForDriver = ({ ride, WaitingForDriverPanel }) => {
  return (
    <div className="h-[72vh] rounded-t-3xl bg-white">

      {/* Header */}
      <div className="relative border-b px-6 py-5">

        <button
          onClick={() => WaitingForDriverPanel(false)}
          className="absolute right-5 top-5 rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronDown size={24} />
        </button>

        <h2 className="text-2xl font-bold">
          Driver is on the way
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Arriving in approximately 2 minutes
        </p>

      </div>

      <div className="h-[calc(72vh-90px)] overflow-y-auto px-6 py-5">

        {/* Driver Card */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
              <Car className="text-cyan-600" size={30} />
            </div>

            <div>
              <h3 className="text-lg font-semibold capitalize">
                {ride?.captain?.fullname?.firstname}
              </h3>

              <p className="text-sm text-gray-500">
                Maruti Suzuki Alto
              </p>

              <p className="text-sm font-medium text-gray-700">
                {ride?.captain?.vehicle?.plate}
              </p>
            </div>

          </div>

          <button className="rounded-full bg-black p-3 text-white hover:bg-gray-800 transition">
            <Phone size={18} />
          </button>

        </div>

        {/* OTP */}
        <div className="mb-6 rounded-2xl bg-cyan-50 p-5 text-center">

          <p className="text-sm text-gray-500">
            Share this OTP with your driver
          </p>

          <h1 className="mt-2 text-5xl font-bold tracking-[10px] text-cyan-600">
            {ride?.otp}
          </h1>

        </div>

        {/* Pickup */}
        <div className="flex items-start gap-4 border-b py-5">

          <div className="rounded-full bg-gray-100 p-3">
            <MapPin size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Pickup
            </h3>

            <p className="text-sm text-gray-500">
              {ride?.pickup}
            </p>
          </div>

        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 border-b py-5">

          <div className="rounded-full bg-gray-100 p-3">
            <Navigation size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Destination
            </h3>

            <p className="text-sm text-gray-500">
              {ride?.destination}
            </p>
          </div>

        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 py-5">

          <div className="rounded-full bg-gray-100 p-3">
            <IndianRupee size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Fare
            </h3>

            <p className="text-xl font-bold">
              ₹{ride?.fare}
            </p>

            <p className="text-sm text-gray-500">
              Cash Payment
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WaitingForDriver;
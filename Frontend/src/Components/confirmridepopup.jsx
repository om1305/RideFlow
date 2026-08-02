import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  MapPin,
  Navigation,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

const ConfirmRidePopUp = ({
  setconfirmridepopup,
  setridepopuppanel,
  ride,
}) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  // const handleStartRide = (e) => {
  //   e.preventDefault();

  //   // Replace this with your backend verification
  //   if (otp.length !== 6) {
  //     alert("Please enter a valid 6-digit OTP");
  //     return;
  //   }
  //   navigate("/captain-ride");
  // };
  const handleStartRide = async (e) => {
  e.preventDefault();

  if (otp.length !== 6) {
    alert("Please enter a valid OTP");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/v1/ride/start-ride`,
      {
        rideId: ride.id,
        otp: otp,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log(response.data);

    setconfirmridepopup(false);
    setridepopuppanel(false);

    navigate("/captain-riding", {
      state: {
        ride: response.data,
      },
    });

  } catch (err) {
    alert(err.response?.data?.message || "Invalid OTP");
  }
};

  

  

  return (
    <div className="h-[85vh] rounded-t-[35px] bg-white">
      {/* Header */}
      <div className="relative border-b px-6 py-5">
        <button
          onClick={() => setconfirmridepopup(false)}
          className="absolute right-6 top-5 rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronDown size={24} />
        </button>

        <h2 className="text-2xl font-bold">Start Ride</h2>

        <p className="mt-1 text-sm text-gray-500">
          Verify passenger OTP before starting
        </p>
      </div>

      <div className="h-[calc(85vh-90px)] overflow-y-auto px-6 py-5">
        {/* Passenger */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white">
                <User size={28} />
              </div>

              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {ride?.user?.fullname?.firstname || "Passenger"}
                </h3>

                <p className="text-sm text-gray-500">Passenger</p>
              </div>
            </div>

            <div className="rounded-xl bg-white px-4 py-2 shadow">
              <h3 className="font-bold">2.2 km</h3>
            </div>
          </div>
        </div>

        {/* Pickup */}
        <div className="mt-6 flex gap-4 border-b pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
            <MapPin className="text-cyan-700" />
          </div>

          <div>
            <h3 className="font-semibold">Pickup</h3>

            <p className="text-sm text-gray-500">
              {ride?.pickup || "Pickup Location"}
            </p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-4 border-b py-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
            <Navigation className="text-violet-700" />
          </div>

          <div>
            <h3 className="font-semibold">Destination</h3>

            <p className="text-sm text-gray-500">
              {ride?.destination || "Destination"}
            </p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex gap-4 border-b py-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <IndianRupee className="text-green-700" />
          </div>

          <div>
            <h3 className="font-semibold">Fare</h3>

            <p className="text-xl font-bold">
              ₹{ride?.fare || 0}
            </p>
          </div>
        </div>

        {/* OTP Section */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="text-cyan-600" size={20} />

            <h3 className="font-semibold">Passenger OTP</h3>
          </div>

          <form onSubmit={handleStartRide}>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-center text-2xl font-bold tracking-[12px] outline-none transition-all focus:border-cyan-500 focus:bg-white"
            />

            <p className="mt-2 text-center text-sm text-gray-500">
              Ask the passenger for the OTP before starting the ride.
            </p>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={otp.length !== 6}
            >
              Start Ride
            </button>

            <button
              type="button"
              onClick={() => {
                setconfirmridepopup(false);
                setridepopuppanel(false);
              }}
              className="mt-3 w-full rounded-2xl border border-red-300 py-4 text-lg font-semibold text-red-600 transition hover:bg-red-50"
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
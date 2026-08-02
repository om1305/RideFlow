import React from "react";
import { ChevronDown, MapPin, IndianRupee, User } from "lucide-react";
import axios from "axios";

const RidePopUp = (props) => {

  const acceptRide = async () => {
    try {

        const token = localStorage.getItem("accessToken");

        await axios.post(
            `${import.meta.env.VITE_BASE_URL}/v1/ride/confirm`,
            {
                rideId: props.ride.id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        props.setridepopuppanel(false);
        props.setconfirmridepopup(true);

    } catch (err) {
        console.log(err);
    }
};

  return (
    <div className="h-[75vh] rounded-t-[30px] bg-white flex flex-col shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold">New Ride</h2>
          <p className="text-sm text-gray-500">
            Passenger waiting nearby
          </p>
        </div>

        <button
          onClick={() => props.setridepopuppanel(false)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Passenger */}
      <div className="mx-5 mt-5 flex items-center justify-between rounded-2xl bg-cyan-50 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white">
            <User size={22} />
          </div>

          <div>
            <h3 className="font-semibold">
              {/* {props.ride?.user?.fullname?.firstname} */}
            </h3>
            <p className="text-sm text-gray-500">
              Passenger
            </p>
          </div>

        </div>

        <div className="rounded-xl bg-white px-3 py-2 shadow">
          <h3 className="font-bold text-lg">2.2 km</h3>
        </div>

      </div>

      {/* Pickup */}
      <div className="mx-5 mt-5 flex items-center gap-4 rounded-xl border p-4">

        <div className="rounded-xl bg-cyan-100 p-3">
          <MapPin className="text-cyan-700" size={22} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Pickup</p>
          <h4 className="font-medium">
            {/* {props.ride?.pickup} */}
          </h4>
        </div>

      </div>

      {/* Fare */}
      <div className="mx-5 mt-4 flex items-center justify-between rounded-xl border p-4">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-100 p-3">
            <IndianRupee className="text-green-700" size={22} />
          </div>

          <div>
            <p className="text-xs text-gray-500">Trip Fare</p>
            <h3 className="text-xl font-bold">
              {/* ₹{props.ride?.fare} */}
            </h3>
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mx-5 mt-6 flex gap-3">

        <button
          onClick={acceptRide}
          className="flex-1 rounded-xl bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700"
        >
          Accept
        </button>

        <button
          onClick={() => props.setridepopuppanel(false)}
          className="flex-1 rounded-xl border border-gray-300 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-100"
        >
          Decline
        </button>

      </div>

    </div>
  );
};

export default RidePopUp;
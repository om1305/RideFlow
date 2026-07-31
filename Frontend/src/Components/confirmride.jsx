import React from "react";
import axios from "axios";

import {
  ChevronDown,
  MapPin,
  Navigation,
  CreditCard,
  Car,
} from "lucide-react";

const ConfirmRide = ({
  VehicleType,
  fares,
  setComfirmPanel,
  setVehiclePanel,
  pickup,
  destination,
  setlookingdriverpanel
}) => {

  const handleCreateRide = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/v1/ride/create`,
      {
        pickup,
        destination,
        vehicleType: VehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // console.log(response.data);
    setlookingdriverpanel(true);
    setComfirmPanel(false);


  } catch (error) {
    console.error(error.response?.data || error);
    alert("Unable to create ride.");
  }
};

  return (
    <div className="h-[65vh] rounded-t-3xl bg-white">

      {/* Header */}
      <div className="relative border-b px-6 py-5">

        <button
          onClick={() => setComfirmPanel(false)}
          className="absolute right-6 top-5 rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronDown size={26} />
        </button>

        <h2 className="text-2xl font-bold">
          Confirm Ride
        </h2>

        <p className="mt-1 text-gray-500">
          Review your trip before booking
        </p>
      </div>

      {/* Content */}
      <div className="h-[calc(65vh-90px)] overflow-y-auto px-6 py-5">

        {/* Vehicle */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
              <Car className="text-cyan-600" size={32} />
            </div>

            <div>
              <h3 className="text-lg font-semibold capitalize">
                
              </h3>

              <p className="text-sm text-gray-500">
                Arrives in 2 mins
              </p>
            </div>

          </div>

          <h3 className="text-2xl font-bold">
            {fares[VehicleType]}
          </h3>

        </div>

        {/* Pickup */}
        <div className="flex items-start gap-4 border-b py-4">

          <div className="rounded-full bg-gray-100 p-3">
            <MapPin size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Pickup
            </h3>

            <p className="text-sm text-gray-500">
                {pickup}
            </p>
          </div>

        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 border-b py-4">

          <div className="rounded-full bg-gray-100 p-3">
            <Navigation size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Destination
            </h3>

            <p className="text-sm text-gray-500">
                {destination}
            </p>
          </div>

        </div>

        {/* Confirm Button */}
        <button
          onClick={handleCreateRide}
          className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-900"
        >
          Confirm Ride
        </button>

      </div>
    </div>
  );
};

export default ConfirmRide;
import React from "react";
import { ArrowLeft, Car, Bike, Bus , ChevronDown } from "lucide-react";

export default function VehiclePanel({ setVehicleType , fares ,setVehiclePanel, setPanelOpen ,setComfirmPanel }) {
  return (
    <div className="h-[65vh] w-full rounded-t-3xl bg-white">

      {/* Header */}
      <div className="sticky top-0 flex items-center gap-4 border-b bg-white px-6 py-5">

        <button
          onClick={() => {
            setVehiclePanel(false);
            setPanelOpen(true);
          }}
          className="rounded-full p-2 transition hover:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </button>

        <h2 className="text-2xl font-bold">
          Choose a Ride
        </h2>

      </div>

      {/* Vehicles */}
      <div className="h-[calc(65vh-80px)] overflow-y-auto px-4 py-4 space-y-3">

        {/* Car */}
        <div 
        onClick={()=>{
        setVehicleType('CAR');
        setVehiclePanel(false);
        setComfirmPanel(true);
      }}
        className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-3 transition hover:border-black">

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100">
              <Car className="text-cyan-600" size={28} />
            </div>

            <div>
              <h3 className="font-semibold">
                RideFlow Go
              </h3>

              <p className="text-xs text-gray-500">
                4 seats • 2 min away
              </p>

              <p className="text-xs text-gray-400">
                Affordable rides
              </p>
            </div>

          </div>

          <h3 className="text-lg font-bold">
            {fares.CAR}
          </h3>

        </div>

        {/* Auto */}
        <div 
        onClick={()=>{
        setVehicleType('AUTO');
        setVehiclePanel(false);
        setComfirmPanel(true);
      }}
        className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-3 transition hover:border-black">

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100">
              <Bus className="text-violet-600" size={28} />
            </div>

            <div>
              <h3 className="font-semibold">
                Auto
              </h3>

              <p className="text-xs text-gray-500">
                3 seats • 3 min away
              </p>

              <p className="text-xs text-gray-400">
                Fast & economical
              </p>
            </div>

          </div>

          <h3 className="text-lg font-bold">
            {fares.AUTO}
          </h3>

        </div>

        {/* Bike */}
        <div 
        onClick={()=>{
          setVehicleType('MOTO');
        setVehiclePanel(false);
        setComfirmPanel(true);
      }}
        className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-3 transition hover:border-black">

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
              <Bike className="text-green-600" size={28} />
            </div>

            <div>
              <h3 className="font-semibold">
                Moto
              </h3>

              <p className="text-xs text-gray-500">
                1 seat • 1 min away
              </p>

              <p className="text-xs text-gray-400">
                Quickest option
              </p>
            </div>

          </div>

          <h3 className="text-lg font-bold">
            {fares.MOTO}
          </h3>

        </div>

      </div>

    </div>
  );
}
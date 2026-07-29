import React from "react";
import { MapPin } from "lucide-react";

const locations = [
  {
    title: "Connaught Place",
    address: "Connaught Place, New Delhi, Delhi 110001",
  },
  {
    title: "India Gate",
    address: "Rajpath, New Delhi, Delhi 110001",
  },
  {
    title: "New Delhi Railway Station",
    address: "Paharganj, New Delhi, Delhi 110055",
  },
  {
    title: "IGI Airport Terminal 3",
    address: "Indira Gandhi International Airport, New Delhi",
  },
  {
    title: "Select Citywalk Mall",
    address: "Saket District Centre, New Delhi, Delhi 110017",
  },
];

export default function LocationSearchPanel({setVehiclePanel , setPanelOpen}) {
  return (
    <div className="mt-6 flex flex-col">

      {locations.map((location, index) => (
        <div
          key={index}
          onClick={()=>{setPanelOpen(false) ; setVehiclePanel(true)}}
          className="
            flex
            cursor-pointer
            items-start
            gap-4
            border-b
            border-gray-200
            py-4
            transition
            hover:bg-gray-100
            px-2
            rounded-xl
          "
        >
          {/* Icon */}
          <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <MapPin size={20} className="text-gray-700" />
          </div>

          {/* Location */}
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900">
              {location.title}
            </h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              {location.address}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}
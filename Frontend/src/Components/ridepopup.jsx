// import React from "react";
// import {
//   ChevronDown,
//   MapPin,
//   Navigation,
//   IndianRupee,
//   User,
// } from "lucide-react";

// const RidePopUp = (props) => {
//   return (
//     <div className="h-[72vh] rounded-t-[35px] bg-white" onClick={()=>props.setridepopuppanel(false)}>
//       {/* Header */}
//       <div className="relative border-b px-6 py-5">

//         <button
//           className="absolute right-6 top-5 rounded-full p-2 hover:bg-gray-100"
//         >
//           <ChevronDown size={24} />
//         </button>

//         <h2 className="text-2xl font-bold">
//           New Ride Request
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           A passenger nearby needs a ride
//         </p>

//       </div>

//       {/* Passenger Card */}
//       <div className="m-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-4">

//             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white">
//               <User size={28} />
//             </div>

//             <div>

//               <h3 className="text-lg font-semibold capitalize">
//               </h3>

//               <p className="text-sm text-gray-500">
//                 Passenger
//               </p>

//             </div>

//           </div>

//           <div className="rounded-xl bg-white px-4 py-2 text-center shadow">

//             <h2 className="text-xl font-bold">
//               2.2 km
//             </h2>

//             <p className="text-xs text-gray-500">
//               Away
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* Ride Details */}

//       <div className="px-6">

//         {/* Pickup */}

//         <div className="flex gap-4 border-b py-5">

//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
//             <MapPin className="text-cyan-700" />
//           </div>

//           <div>

//             <h4 className="font-semibold">
//               Pickup
//             </h4>

//             <p className="text-sm text-gray-500">
//             </p>

//           </div>

//         </div>

//         {/* Destination */}

//         <div className="flex gap-4 border-b py-5">

//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
//             <Navigation className="text-violet-700" />
//           </div>

//           <div>

//             <h4 className="font-semibold">
//               Destination
//             </h4>

//             <p className="text-sm text-gray-500">
//             </p>

//           </div>

//         </div>

//         {/* Fare */}

//         <div className="flex gap-4 py-5">

//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
//             <IndianRupee className="text-green-700" />
//           </div>

//           <div>

//             <h4 className="font-semibold">
//               Fare
//             </h4>

//             <p className="text-xl font-bold">
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* Buttons */}

//       <div className="bottom-6 left-0 w-full px-6">

//         <button
//           onClick={() => {
//             props.setridepopuppanel(false);
//             props.setconfirmridepopup(true);
//           }}
//           className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
//         >
//           Accept Ride
//         </button>

//         <button
//           onClick={() => props.setridepopuppanel(false)}
//           className="mt-3 w-full rounded-xl border border-gray-300 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-100"
//         >
//           Ignore
//         </button>

//       </div>

//     </div>
//   );
// };

// export default RidePopUp;

import React from "react";
import { ChevronDown, MapPin, IndianRupee, User } from "lucide-react";

const RidePopUp = (props) => {
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
          onClick={() => {
            props.setridepopuppanel(false);
            props.setconfirmridepopup(true);
          }}
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
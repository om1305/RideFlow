import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Car,
  Navigation,
  CreditCard,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SocketContext } from "../Context/socket.context";


const Riding = () => {
  const [ride , setRide] = useState(null);
  const navigate = useNavigate();

  const {socket} = useContext(SocketContext);

//   useEffect(() => {
//     socket.on("ride-confirmed",(rideData)=>{
//         console.log("Ride Confirmed");
//         setRide(rideData);
//     });
//     return ()=>socket.off("ride-confirmed");
// },[]);

//   useEffect(() => {

//     socket.on("ride-started",(rideData)=>{

//         console.log("Ride Started");
//         setRide(rideData);

//     });

//     return ()=>socket.off("ride-started");

// },[]);

//   useEffect(()=>{

//     socket.on("ride-ended",(rideData)=>{

//         console.log("Ride Ended");

//         navigate("/user-home");

//     });

//     return ()=>socket.off("ride-ended");

// },[]);




  return (
    <div className="relative h-screen bg-gray-100">

      {/* Home Button */}
      <Link
        to="/user-home"
        className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
      >
        <Home size={22} />
      </Link>

      {/* Map */}
      <div className="h-[50%]">
        {/* <LiveTracking /> */}
      </div>

      {/* Bottom Card */}
      <div className="h-[50%] rounded-t-3xl bg-white px-6 py-5 shadow-2xl">

        {/* Driver Info */}
        <div className="flex items-center justify-between border-b pb-5">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
              <Car className="text-cyan-600" size={30} />
            </div>

            <div>
              <h2 className="text-xl font-bold capitalize">
                {/* {ride?.captain?.fullname?.firstname} */}
              </h2>

              <p className="text-sm text-gray-500">
                Driver • ⭐ 4.9
              </p>

              <p className="text-sm text-gray-400 capitalize">
                {/* {ride?.captain?.vehicle?.vehicleType} */}
              </p>
            </div>

          </div>

          <div className="text-right">

            <h3 className="text-xl font-bold">
              {/* {ride?.captain?.vehicle?.plate} */}
            </h3>

            <p className="text-sm text-gray-500">
              On Trip
            </p>

          </div>

        </div>

        {/* Destination */}
        <div className="mt-6 flex items-start gap-4 border-b pb-5">

          <div className="rounded-full bg-gray-100 p-3">
            <Navigation size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              Destination
            </h3>

            <p className="text-sm text-gray-500">
              {/* {ride?.destination} */}
            </p>
          </div>

        </div>

        {/* Fare */}
        <div className="flex items-center justify-between border-b py-5">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-gray-100 p-3">
              <CreditCard size={20} />
            </div>

            <div>
              <h3 className="font-semibold">
                Payment
              </h3>

              <p className="text-sm text-gray-500">
                Cash
              </p>
            </div>

          </div>

          <h3 className="text-2xl font-bold">
            {/* ₹{ride?.fare} */}
          </h3>

        </div>

        {/* Call & Message */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          <button className="flex items-center justify-center gap-2 rounded-xl border border-black py-3 font-semibold transition hover:bg-gray-100">
            <Phone size={18} />
            Call
          </button>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-900">
            <MessageCircle size={18} />
            Message
          </button>

        </div>

        {/* Payment Button */}
        <button className="mt-5 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700">
          Make Payment
        </button>

      </div>
    </div>
  );
};

export default Riding;
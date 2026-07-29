import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, MapPin, Navigation, IndianRupee, ChevronUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../Components/finishride";

const CaptainRiding = () => {
    const [finishridepanel , setfinishridepanel] = useState(false);

    const setfinishridepanelRef = useRef(null);

    useGSAP(()=>{
    gsap.to(setfinishridepanelRef.current , {
      y: finishridepanel ? '0%' : '100%' ,
      duration : 0.4,
      ease : "power3.out"
    });
  },[finishridepanel]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050816]">

      {/* Live Map */}

      <div className="absolute inset-0">
      </div>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Header */}

      <div className="absolute top-0 left-0 z-20 flex w-full items-center justify-between p-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Ride<span className="text-cyan-400">Flow</span>
          </h1>

          <p className="text-sm text-gray-300">
            Ride in Progress
          </p>

        </div>

        <Link
          to="/captain-home"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl"
        >
          <LogOut size={20} />
        </Link>

      </div>

      {/* Bottom Card */}

      <div
        onClick={() => setFinishRidePanel(true)}
        className="absolute bottom-0 left-0 z-20 w-full rounded-t-[35px] bg-white p-6 shadow-2xl cursor-pointer"
      >

        <div className="flex justify-center">
          <ChevronUp size={28} className="text-gray-400" />
        </div>

        <div className="mt-2 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Ride in Progress
            </h2>

            <p className="text-gray-500">
              Passenger onboard
            </p>

          </div>

          <div className="rounded-2xl bg-cyan-100 px-5 py-3">

            <h2 className="text-2xl font-bold text-cyan-700">
              4 km
            </h2>

            <p className="text-xs text-center text-gray-500">
              Remaining
            </p>

          </div>

        </div>

        {/* Destination */}

        <div className="mt-6 flex items-start gap-4 rounded-2xl bg-gray-50 p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">

            <Navigation className="text-violet-700" />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Destination
            </p>

            <h3 className="font-semibold">
            </h3>

          </div>

        </div>

        {/* Complete Button */}

        <button
        onClick={()=> {setfinishridepanel(true)}}
          className="mt-6 w-full rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          Complete Ride
        </button>

      </div>

      {/* Finish Ride Panel */}

      <div
      ref={setfinishridepanelRef}
        className="fixed bottom-0 left-0 z-40 w-full translate-y-full rounded-t-[35px] bg-white"
      >
        <FinishRide />
      </div>

    </div>
  );
};

export default CaptainRiding;
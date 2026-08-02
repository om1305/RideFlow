import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RidePopUp from "../Components/ridepopup";
import ConfirmRidePopUp from "../Components/confirmridepopup";
import axios from "axios";
import { CaptainDetails } from "../Components/captaindetail";
import { SocketContext } from "../Context/socket.context";

const CaptainHome = () => {
  const [ridepopuppanel , setridepopuppanel] = useState(false);
  const [confirmridepopup , setconfirmridepopup] = useState(false);
  const [captains , setcaptains] = useState(null);
  const [ride , setRide] = useState(null);

  const ridepopuppanelRef = useRef(null);
  const confirmridepopupRef = useRef(null);

  const {socket} = useContext(SocketContext);

  const captain = async() => {
    try {
      
      const token = localStorage.getItem('accessToken');
  
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v1/captain/getprofile` , 
         {headers : {Authorization: `Bearer ${token}`}
    })
    setcaptains(response.data.captain)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    if(!captains) return;
    console.log("Joining with", captains);
    socket.emit("join" , {
      userId : captains.id,
      userType : "captain"
    })
  } , [captains]);

  useEffect(()=>{
    socket.on("new-ride",(rideData) => {
      console.log(rideData);
      setRide(rideData);
      setridepopuppanel(true);
    })
    return () => {
      socket.off("new-ride");
    }
  } ,[]);

  useEffect(()=>{captain()},[]);


  useGSAP(()=>{
    gsap.to(confirmridepopupRef.current , {
      y: confirmridepopup ? '0%' : '100%' ,
      duration : 0.4,
      ease : "power3.out"
    });
  },[confirmridepopup]);

  useGSAP(()=>{
    gsap.to(ridepopuppanelRef.current , {
      y: ridepopuppanel ? '5%' : '100%' ,
      duration : 0.4,
      ease : "power3.out"
    });
  },[ridepopuppanel]);
  
  return (
    <div className="relative h-screen overflow-hidden bg-[#050816]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />

      {/* Map */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-80"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 z-20 flex w-full items-center justify-between p-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Ride<span className="text-cyan-400">Flow</span>
          </h1>

          <p className="mt-1 text-sm text-gray-300">
            Driver Dashboard
          </p>
        </div>

        <Link
          to="/captain-home"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
        >
          <LogOut size={20} />
        </Link>
      </div>

      {/* Bottom Details */}
      <div
className="absolute bottom-0 left-0 z-20 h-[50%] w-full rounded-t-[32px] bg-[#0F172A] text-white shadow-[0_-25px_80px_rgba(0,0,0,0.45)]">       
 <CaptainDetails captains = {captains} />

      </div>

      {/* Ride Popup */}
      <div
      ref={ridepopuppanelRef}
        className="fixed bottom-0 left-0 z-40 w-full translate-y-full rounded-t-[35px] bg-white"
      >
        <RidePopUp ride = {ride} setridepopuppanel = {setridepopuppanel} setconfirmridepopup = {setconfirmridepopup} />
      </div>

      {/* Confirm Popup */}
      <div
      ref={confirmridepopupRef}
        className="fixed bottom-0 left-0 z-50 w-full translate-y-full rounded-t-[35px] bg-white"
      >
        <ConfirmRidePopUp setconfirmridepopup = {setconfirmridepopup} setridepopuppanel = {setridepopuppanel}  />
      </div>
    </div>
  );
};

export default CaptainHome;
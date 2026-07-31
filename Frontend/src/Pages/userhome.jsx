import { useRef, useState } from "react";
import { MapPin, Navigation, Search, ChevronDown } from "lucide-react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/confirmride";
import LookingForDriver from "../Components/lookingfordriver";
import WaitingForDriver from "../Components/waitingfordriver";
import axios from "axios";

export default function Userhome() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickup , setpickup] = useState('');
  const [destination , setdestination] = useState('');
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ confirmPanel , setComfirmPanel] = useState(false);
  const [lookingdriverpanel , setlookingdriverpanel] = useState(false);
  const [waitingfordriverpanel , setwaitingfordriverpanel] = useState(false);

  const [fares , setfares] = useState('');
  const [vehicleType , setVehicleType] = useState('');

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const lookingDriverPanelRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const submitHandler = async(e) => {
    e.preventDefault();
    await findRideHandler();
  }

  const findRideHandler = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v1/ride/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers : {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      })

      setfares(response.data);
      setPanelOpen(false);
      setVehiclePanel(true);
    } catch (error) {
      console.error(error);
    }
  }

  useGSAP(()=>{
    gsap.to(WaitingForDriverRef.current, {
      y: waitingfordriverpanel ? '5%' : '100%',
      duration:0.4,
      ease: "power3.out",
    });
  },[waitingfordriverpanel]);

  useGSAP(()=>{
    gsap.to(lookingDriverPanelRef.current, {
      y: lookingdriverpanel ? '5%' : '100%',
      duration:0.4,
      ease: "power3.out",
    });
  },[lookingdriverpanel]);

  useGSAP(()=>{
    gsap.to(confirmPanelRef.current, {
      y: confirmPanel ? '-10%' : '100%',
      duration:0.4,
      ease: "power3.out",
    });
  },[confirmPanel]);

  useGSAP(()=>{
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanel ? '5%' : '100%',
      duration:0.4,
      ease: "power3.out",
    });
  },[vehiclePanel]);
 
  useGSAP(() => {
    gsap.to(panelRef.current,{
        height: panelOpen ? "70%" : "35%",
        duration:0.35,
        ease:"power2.out"
    });
},[panelOpen]);
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050816]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10" />

      {/* Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl opacity-10">🗺️</div>
      </div>

      {/* Logo */}
      <div className="absolute left-6 top-6 z-20">
        <h1 className="text-3xl font-bold text-white">
          Ride<span className="text-cyan-400">Flow</span>
        </h1>
      </div>

      {/* Bottom Panel */}
      <div
    ref={panelRef}
    className="absolute bottom-0 left-0 w-full h-[35%] rounded-t-3xl bg-white overflow-hidden"
>
        <div className="relative p-6">

          {/* Collapse */}
          {panelOpen && (
            <button
              onClick={() => setPanelOpen(false)}
              className="absolute right-6 top-6"
            >
              <ChevronDown size={28} />
            </button>
          )}
        <form onSubmit={(e)=>{submitHandler(e)}}>

          <h2 className="text-3xl font-bold">
            Find a Ride
          </h2>

          <div className="relative mt-6 space-y-4">

            <div className="absolute left-5 top-5 h-16 w-[2px] bg-gray-400" />

            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={18}
                />

              <input
                value={pickup}
                onClick={()=>{
                  setPanelOpen(true)
                }}
                onChange={(e)=>{setpickup(e.target.value)}}
                placeholder="Pickup location"
                className="w-full rounded-xl bg-gray-100 py-4 pl-12 pr-4 outline-none"
                />
            </div>

            <div className="relative">
              <Navigation
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={18}
                />

              <input
                value={destination}
                onClick={()=>{
                  setPanelOpen(true)
                }}
                onChange={(e)=>{setdestination(e.target.value)}}
                onFocus={() => setPanelOpen(true)}
                placeholder="Where to?"
                className="w-full rounded-xl bg-gray-100 py-4 pl-12 pr-4 outline-none"
                />
            </div>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-lg font-semibold text-white"
            
          >
            <Search size={20} />
            Find Ride
          </button>
        </form>
        <div className="mt-6 h-[300px] overflow-y-auto">
          <LocationSearchPanel setVehiclePanel = {setVehiclePanel} setPanelOpen = {setPanelOpen} />
        </div>
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 left-0 w-full translate-y-full rounded-t-3xl bg-white z-30"
        >
        <VehiclePanel setVehicleType = {setVehicleType}  fares = {fares} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} setComfirmPanel = {setComfirmPanel}/>
      </div>
      <div
      ref={confirmPanelRef}
      className="fixed bottom-0 left-0 w-full translate-y-full rounded-t-3xl bg-white z-30">
        <ConfirmRide 
        VehicleType = {vehicleType}
        fares = {fares}
        setComfirmPanel={setComfirmPanel} 
        setVehiclePanel = {setVehiclePanel} 
        pickup = {pickup} 
        destination = {destination}
        setlookingdriverpanel = {setlookingdriverpanel}
        />
      </div>
      <div
      ref={lookingDriverPanelRef}
      className="fixed bottom-0 left-0 w-full translate-y-full rounded-t-3xl bg-white z-30">
        <LookingForDriver setlookingdriverpanel ={setlookingdriverpanel} setComfirmPanel = {setComfirmPanel} />
      </div>
      <div 
      ref = {WaitingForDriverRef}
      className="fixed bottom-0 left-0 w-full translate-y-full rounded-t-3xl bg-white z-30">
        <WaitingForDriver waitingfordriverpanel = {waitingfordriverpanel}/>
      </div>
    </div>
  );
}
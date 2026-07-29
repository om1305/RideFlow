import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { CaptainDataContext } from "../Context/captain.context";


const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30";

export default function CaptainSignup() {
  const navigate = useNavigate();

   const [firstName , setfirstName] = useState('');
    const [lastName , setlastName] = useState('');
    const [email , setemail] = useState('');
    const [Password , setPassword] = useState('');
    const [vehicleColour , setvehicleColour] = useState('');
    const [vehicleCapacity , setvehicleCapacity] = useState('');
    const [vehiclePlate , setvehiclePlate] = useState('');
    const [vehicleType , setvehicleType] = useState('');

    const {captain , setcaptain} = React.useContext(CaptainDataContext);
    const [captainRegisterData , setCaptainRegisterData] = useState({})
    const submitHandler = async(e) => {
      e.preventDefault();

      const captainRegisterData = {
      firstName: firstName,
      lastName : lastName,
      email : email,
      password:Password,
      vehicleColour:vehicleColour,
      vehiclePlate:vehiclePlate,
      vehicleCapacity:Number(vehicleCapacity),
      vehicleType:vehicleType,
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/captain/register`, captainRegisterData);

    if(response.status === 201 ){
      const data = response.data;
      setCaptainRegisterData(data);
      localStorage.setItem("accesstoken",data.accessToken);
      navigate('/captain-home');
    }

    setPassword('');
    setemail('');
    setfirstName('');
    setlastName('');
    setvehicleColour('');
    setvehicleCapacity('');
    setvehiclePlate('');
    setvehicleType('');
    }
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        <button
          onClick={() => navigate("/captain-login")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-4xl font-bold text-white">
          Captain Registration
        </h1>

        <p className="text-gray-400 mt-2 mb-8">
          Register your vehicle and start earning
        </p>

        <form onSubmit={(e)=>{submitHandler(e)}} className="flex flex-col gap-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e)=>{setfirstName(e.target.value)}}
              placeholder="First Name"
              className={inputClass}
            />

            <input
              type="text"
              value={lastName}
              onChange={(e)=>{setlastName(e.target.value)}}
              placeholder="Last Name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            value={email}
              onChange={(e)=>{setemail(e.target.value)}}
            placeholder="Email"
            className={inputClass}
          />

          {/* Password */}
          <input
            type="password"
            value={Password}
              onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className={inputClass}
          />

          {/* Vehicle Colour & Plate */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={vehicleColour}
              onChange={(e)=>{setvehicleColour(e.target.value)}}
              placeholder="Vehicle Colour"
              className={inputClass}
            />

            <input
              type="text"
              value={vehiclePlate}
              onChange={(e)=>{setvehiclePlate(e.target.value)}}
              placeholder="Vehicle Plate Number"
              className={inputClass}
            />
          </div>

          {/* Capacity & Type */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e)=>{setvehicleCapacity(e.target.value)}}
              placeholder="Vehicle Capacity"
              className={inputClass}
            />

            <select
              defaultValue=""
              value={vehicleType}
              onChange={(e)=>{setvehicleType(e.target.value)}}
              className={inputClass}
            >
              <option value="" disabled className="text-black">
                Select Vehicle Type
              </option>
              <option value="CAR" className="text-black">
                Car
              </option>
              <option value="MOTORCYCLE" className="text-black">
                Motorcycle
              </option>
              <option value="AUTO" className="text-black">
                Auto
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-violet-500 py-4 font-semibold text-white transition hover:bg-violet-600"
          >
            Register Captain
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already registered?
          <button
            onClick={() => navigate("/captain-login")}
            className="ml-2 text-violet-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
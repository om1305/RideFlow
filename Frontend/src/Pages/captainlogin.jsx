import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../Context/captain.context";

export default function Captainlogin() {
  const navigate = useNavigate();

  const [email , setemail] = useState('');
  const [Password , setPassword] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const submitHandler = async(e)=>{
    e.preventDefault();

    const captainData = {
      email : email,
      password : Password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/captain/login`,captainData);

    if(response.status === 200 ){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('accessToken',data.accessToken)
      navigate('/captain-home');
    }

    setPassword('');
    setemail('');
  }


  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
      <div
        className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
"
      >
        <h1 className="text-4xl font-bold mb-2">Captain Login</h1>

        <p className="text-gray-400 mb-8">Access your driver dashboard</p>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
          type="email"
          className="
w-full
mb-4
rounded-xl
bg-black/40
border
border-white/20
px-5
py-4
"
        />

        <input
          placeholder="Password"
          value={Password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          type="password"
          className="
          w-full
          mb-6
          rounded-xl
          bg-black/40
          border
          border-white/20
          px-5
          py-4
          "
        />

        <button
          className="
          w-full
          rounded-xl
          bg-violet-500
          py-4
          font-semibold
          "
          >
          Login
        </button>

          </form>
        <p className="text-center mt-6 text-gray-400">
          New Captain?
          <button
            onClick={() => navigate("/captain-signup")}
            className="ml-2 text-violet-400"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

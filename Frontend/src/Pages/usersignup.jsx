import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function UserSignup() {
  const navigate = useNavigate();
  const [firstName , setfirstName] = useState('');
  const [lastName , setlastName] = useState('');
  const [email , setemail] = useState('');
  const [Password , setPassword] = useState('');

  const [userRegisterData , setuserRegisterData] = useState({}); 
  const submitHandler = async(e) => {
    e.preventDefault();

    const userRegisterData = {
      firstName: firstName,
      lastName : lastName,
      email : email,
      password:Password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/users/register`,userRegisterData);

    if(response.status === 201 ){
      const data = response.data;
      setuserRegisterData(data);
      navigate('/page');
    }
    setPassword('');
    setemail('');
    setfirstName('');
    setlastName('');
  }
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-gray-400 mt-2 mb-8">
          Register to start booking rides
        </p>

        {/* Form */}
        <form onSubmit={(e)=>{submitHandler(e)}} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e)=>{setfirstName(e.target.value)}}
              placeholder="First Name"
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              value={lastName}
              onChange={(e)=>{setlastName(e.target.value)}}
              placeholder="Last Name"
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            placeholder="Email"
            className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
          />

          {/* Password */}
          <input
            type="password"
            value={Password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
          />

          {/* Button */}
          <button
            className="w-full rounded-xl bg-cyan-400 py-4 font-semibold text-black hover:bg-cyan-300 transition"
          >
            Register
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-cyan-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
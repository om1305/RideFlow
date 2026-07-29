import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from 'axios';

export default function Userlogin() {
  const navigate = useNavigate();

  const [email , setemail] = useState('');
  const [Password , setPassword] = useState('');
  const [userData , setuserData] = useState({});

  const submitHandler = async(e) => {
    e.preventDefault();
    
    const userData = {
      email : email ,
      password : Password
    };
    console.log(userData);
    setemail('');
    setPassword('');
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/users/login`,userData);

    if(response.status === 200){
      const data = response.data;
      setuserData(data.user);
      localStorage.setItem('token',data.accessToken)
      navigate('/user-home')
    }
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
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-gray-400 hover:text-white flex gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Login to book your ride</p>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>

        <input
          type="email"
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
          placeholder="Email"
          className="
        w-full
        mb-4
        rounded-xl
        bg-black/40
        border
        border-white/20
        px-5
        py-4
        outline-none
        focus:border-cyan-400
        "
        />
        <input
          type="password"
          value={Password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          placeholder="Password"
          className="
        w-full
        mb-6
        rounded-xl
        bg-black/40
        border
        border-white/20
        px-5
        py-4
        outline-none
        focus:border-cyan-400
        "
        />

        <button
          className="
          w-full
          rounded-xl
        bg-cyan-400
        py-4
        text-black
        font-semibold
        hover:scale-105
        transition
        "
        >
          Login
        </button>
          </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className="ml-2 text-cyan-400"
            >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

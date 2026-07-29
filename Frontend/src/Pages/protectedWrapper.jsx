// import React, { useContext } from 'react'
// import { UserDataContext } from '../Context/user.context'
// import { useNavigate } from 'react-router-dom';

// const UserprotectedWrapper = ({children}) => {
    
//     const accessToken = localStorage.getItem('accessToken')
//     const navigate = useNavigate();

//     if(!accessToken){
//         navigate('/login')
//         return
//     }
//   return (
//     <div>{children}</div>
//   )
// }

// export default UserprotectedWrapper

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/user.context";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users/getprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  return children;
};

export default UserProtectedWrapper;
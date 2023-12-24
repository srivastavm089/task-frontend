import React, { Fragment, useEffect, useState } from "react";
import AnimationCard from "./AnimationCard";
import { useMyContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { bubble } from "../utils";
import Starting from "../Starting/Starting";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("token"));
    if (check) {
      getUser();
    }
  }, []);
  const getUser = async () => {
    const checkUser = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.get(
      `https://task-5b0t.onrender.com/task/v1/me/${checkUser}`
    );
    setUser({ email: data.user.email, role: data.user.role });
  };

  const {
    checkData,
    setCheckData,
    setLogoutLoader,
    loginLoader,
    setLoginLoader,
    message,
    setMessage,
    LogoutLoader,
  } = useMyContext();
  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("token"));

    if (loginLoader) {
     

      setTimeout(() => {
        setLoginLoader(false);
        setMessage("");
      }, 8000);
    }
  if(message){
   setTimeout(()=>{
    toast.success(`${message} 😍`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
       setMessage("")
   },8200 )

  }
    

    if (!check) {
      navigate("/login");
    }
  }, [loginLoader, message, LogoutLoader]);
  return (
    <Fragment>
      {loginLoader ? (
        <Starting />
      ) : (
        <div
          className="flex justify-center items-center gap-5 bg-green-200 gap h-screen flex-col sm:flex-row"
          id="homeBackground"
        >
          <button
            className="absolute text-[10px]  sm:text-lg right-3 top-1 text-white hover:bg-[#00AC9F] logout font-bold p-2 rounded cursor-pointer"
            id="logout"
            onClick={() => {
              localStorage.removeItem("token");
              setCheckData(null);
              setLogoutLoader(true);
            }}
          >
            Logout
          </button>
          {user.role == "admin" && (
            <Link
              to="/admin/dashboard"
              className="hover:text-[#00E4CD] absolute top-1 text-[10px] flex-col-reverse left-2 flex flex-col gap-1 text-white items-center"
            >
              Dashboard
              <DashboardIcon
                className="sm:text-4xl text-white "
                id="logoutBtn"
              />
            </Link>
          )}
          <div className="bubbles">
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
            <img src={bubble} alt="logo" />
          </div>
          <ToastContainer />
          <AnimationCard name="D90" path="/D90" />

          <AnimationCard name="D120" path="/D120" />
          <AnimationCard name="D180" path="/D180" />
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(Home);

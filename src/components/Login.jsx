import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailIcon from "@mui/icons-material/Email";
import React, { useEffect, useState } from "react";
import { useMyContext } from "./Context";

import KeyIcon from "@mui/icons-material/Key";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { setLoginLoader, LogoutLoader, setLogoutLoader, setMessage, message } =
    useMyContext();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("token"));
    if (message) {
      navigate("/");
    }
    if (check) {
      {
        navigate("/");
      }
    }
  }, [message]);
  useEffect(() => {
    if (LogoutLoader) {
      toast.success("Logged Out 💀", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLogoutLoader(false);
    }
  }, [LogoutLoader]);
  const loginHandler = async (e) => {
    e.preventDefault();

    let data = await toast.promise(
      fetch("https://task-5b0t.onrender.com/task/v1/loginUser", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }),
      {
        pending: "Verifying Data",
        success: "Verified",
        error: "wrong password or email",
      }
    );

    data = await data.json();

    if (data.success) {
      setLoginLoader(true);
      setMessage(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
    }
  };

  return (
    <div className="login-body">
      <ToastContainer className="w-96 sm:w-full" />
      <div className="middle-parent">
        <div className="login-middle hidden md:flex"></div>
        <div className="login-middle-bro p-5 w-96  lg:w-[50%] relative">
          {/* <div>
            <img src="https://res.cloudinary.com/donopxkfj/image/upload/v1702983687/Corrosion_slctoa.png" className="w-12" alt="logo" />
          </div> */}
          <div className="flex flex-col gap-2">
            <div className="text-center text-2xl text-orange-400 font-bold">
              LOGIN
            </div>
            <form className="flex flex-col gap-5 box-border ">
              <div className="flex flex-col relative">
                <span className="text-white">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="rounded h-8 pl-8 w-full"
                  style={{ height: "18px", width: "80%" }}
                />
                <EmailIcon className="absolute top-7 left-1 opacity-50" />
              </div>

              <div className="flex flex-col relative">
                <span className="text-white">Password</span>
                <input
                  type="password"
                  className="rounded h-8 pl-8 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: "18px", width: "80%" }}
                />

                <KeyIcon className="absolute top-7 left-1 opacity-50" />
              </div>

              <input
                type="button"
                onClick={loginHandler}
                value="Login"
                id="logoutBtn"
                style={{ height: "36px" }}
                className="logoutBtn w-[50%] md:w-[100%] bg-[#FB923C] flex h-[32px] justify-center items-center text-white cursor-pointer hover:bg-gray-500  rounded active:bg-gray-500"
              ></input>

              <div>
                <Link
                  to="/register"
                  className="text-[12px]  rounded text-white"
                >
                  don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="hover:text-red-500   active:text-red-500 "
                  >
                    Register
                  </Link>
                </Link>
              </div>
            </form>
          </div>
          <div className="absolute border-t-2 w-60 sm:w-60  md:w-48 bottom-2 flex justify-between pt-2 xl:w-60">
            <div className="text-[10px] text-white">Copyright 2018 </div>
            <div className="text-[10px] text-white">
              Terms & Conditions | Privacy policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);

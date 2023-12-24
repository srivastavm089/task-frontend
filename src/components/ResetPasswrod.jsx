import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const ResetPasswrod = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const resetHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `https://task-5b0t.onrender.com/task/v1/finalReset`,
      { password, confirmPassword, email },
      { headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      toast.success(`${data.message} 😍`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    setTimeout(()=>{
      navigate("/login");
    }, 3000)
    } else {
      toast.error(`${data.message} `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    console.log(data);
  };
  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <ToastContainer />
      <form
        action=""
        className="flex flex-col gap-4 bg-white p-20"
        onSubmit={resetHandler}
      >
        <h1 className="text-2xl font-bold text-center">Reset Passowrd</h1>
        <input
          type="text"
          placeholder="Re enter your mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-72"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="password"
          className="w-72"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirmPassword"
        />
        <button
          type="submit"
          className="bg-[tomato] pt-2 pb-2 hover:bg-gray-600 text-white"
          id="logout "
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default React.memo(ResetPasswrod);

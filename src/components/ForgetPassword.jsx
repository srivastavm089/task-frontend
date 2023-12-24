import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const resetHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `https://task-5b0t.onrender.com/task/v1/forgetPassword`,
      { email },
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
    } else {
      toast.error(`${data.message} 😍`, {
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
  };

  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <ToastContainer />
      <div>
        <form
          className="flex flex-col items-center  bg-white p-12 gap-2 "
          onSubmit={resetHandler}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            className="rounded w-56"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-[tomato] pt-2 pb-2 text-white text-sm hover:bg-gray-500 w-36 rounded "
            id="logout"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ForgetPassword);

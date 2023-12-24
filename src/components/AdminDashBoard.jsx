import React, { Fragment, useEffect, useState } from "react";
import MyChart from "../apex/LineChart";
import Button from "@mui/material/Button";
import Loader from "./Loader";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const AdminDashBoard = () => {
  const [image, setImage] = React.useState("");
  const [userEmail, setUserEmail] = useState("");
  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState == 2) {
        setImage(reader.result);
      }
    };
  };
  const [userCount, setUserCount] = useState(0);
  const [imageData, setImageData] = React.useState([]);
  const [access, setAccess] = useState("");
  const fetchImages = async () => {
    const id = JSON.parse(localStorage.getItem("token"));

    const { data } = await axios.get(
      `https://new-task-27yy.onrender.com/task/v1/getImage/${id}`
    );

    setImageData(data.data);
    setLoader(false);
  };
  const [loader, setLoader] = React.useState(false);
  const updateHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const user = JSON.parse(localStorage.getItem("token"));
    const data = await fetch(
      `https://new-task-27yy.onrender.com/task/v1/admin/userAdd/images/${user}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: image, access, email: userEmail }),
      }
    );
 
 
    setLoader(false);

    setImage("");
    setTimeout(()=>{
      if (!data.status===201) {
        toast.error(`user not found `, {
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
        toast.success(`Data  Send Successfully `, {
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
    },2000)
   
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const getUserCount = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.get(
      `https://new-task-27yy.onrender.com/task/v1/admin/userList/${user}`
    );

    setUserCount(data.count);
  };
  useEffect(() => {
    getUserCount();
  }, []);

  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-black h-full w-[100vw] ">
          <ToastContainer />
          <MyChart className="w-[100vw]" count={userCount} />
          <form className="flex flex-col gap-10 justify-center items-center h-full p-36">
            <div>
              <input
                type="text"
                placeholder="access"
                className="sm:w-[25vw]"
                onChange={(e) => setAccess(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <input
                type="text"
                placeholder="user email"
                className="sm:w-[25vw]"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-4 gap-2 justify-center items-center">
              <img
                className="rounded-full w-20 h-20"
                src={
                  image ||
                  "data:image/png;base64,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"
                }
                alt="logo"
              />
              <div className="flex flex-col gap-2">
                <Button
                  component="label"
                  variant="contained"
                  className="sm:w-56 w-36 sm:h-8"
                  style={{ fontSize: "10px" }}
                >
                  Choose File
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                <button
                  className="bg-[tomato] w-36 text-[10px]  pt-2 pb-2 rounded text-white  sm:w-56"
                  onClick={updateHandler}
                >
                  UPLOAD IMAGE
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(AdminDashBoard);

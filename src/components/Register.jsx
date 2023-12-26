import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailIcon from "@mui/icons-material/Email";
import React, { useEffect, useState } from "react";
import { useMyContext } from "./Context";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const { setLoginLoader, LogoutLoader, setLogoutLoader, setMessage } =
    useMyContext();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
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
  const loginHandler = async ({ email, password, confirmPassword }) => {
    let data = await fetch("https://task-5b0t.onrender.com/task/v1/register", {
      method: "post",
      body: JSON.stringify({ email, password, confirmPassword }),
      headers: { "Content-Type": "application/json" },
    });
    data = await data.json();

    if (!data.success) {
      toast.error(data.message + "😂", {
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
      setLoginLoader(true);
      setMessage(data.message);
      navigate("/");

      localStorage.setItem("token", JSON.stringify(data.token));
    }
  };
  return (
    <div className="login-body  ">
      <ToastContainer />
      <div className="middle-parent">
        <div className="login-middle hidden md:flex"></div>
        <div className="login-middle-bro p-5 w-96  lg:w-[50%] relative">
          {/* <div>
            <img src="https://res.cloudinary.com/donopxkfj/image/upload/v1702983687/Corrosion_slctoa.png" className="w-12" alt="logo" />
          </div> */}
          <div className="flex flex-col gap-2">
            <div className="text-center text-2xl text-orange-400 font-bold">
              REGSITER
            </div>
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit((data) => {
                loginHandler(data);
              })}
            >
              <div className="flex flex-col relative">
                <span className="text-white">Email</span>
                <input
      
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim,
                      message: "enter valid email id ",
                    },
                  })}
                  formNoValidate
                  style={{ height: "18px", width: "80%" }}
                  className="rounded h-8 pl-8 w-full"
                />
                <p className="text-[tomato] text-sm text-center ">
                  {errors && errors.email && errors.email.message}
                </p>
                <EmailIcon className="absolute top-7 left-1 opacity-50" />
              </div>
              <div className="flex flex-col relative">
                <span className="text-white">Password</span>
                <input
                  type="password"
                  className="rounded h-8 pl-8 w-full "
                  style={{ height: "18px", width: "80%" }}
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm,
                      message: `Password should be at least one capital letter, one small letter, one number and 8 character length`,
                    },
                  })}
                  formNoValidate
                />
                <p className="text-[tomato] text-sm text-center ">
                  {errors && errors.password && errors.password.message}
                </p>
                <KeyIcon className="absolute top-7 left-1 opacity-50" />
              </div>
              <div className="flex flex-col relative">
                <span className="text-white">Confirm Password</span>
                <input
                  type="password"
                  className="rounded h-8 pl-8 w-full "
                  style={{ height: "18px", width: "80%" }}
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    validate: (val, formValue) =>
                      val === formValue.password || "password does not match",
                  })}
                  formNoValidate
                />
                <p className="text-[tomato] text-sm text-center ">
                  {errors &&
                    errors.confirmPassword &&
                    errors.confirmPassword.message}
                </p>
                <LockIcon className="absolute top-7 left-1 opacity-50" />
              </div>
              <input
                type="button"
                onClick={loginHandler}
                value="Register"
                id="logoutBtn"
                style={{ height: "36px",}}
                className="logoutBtn w-[50%] md:w-[100%]  bg-[#FB923C] flex h-[32px] justify-center items-center text-white cursor-pointer hover:bg-gray-500  rounded active:bg-gray-500"
              >
                
              </input>

              <div>
                <Link
                  to="/register"
                  className="text-[12px]  rounded text-white"
                >
                  already have an account ?{" "}
                  <Link to="/login" id="logoutBtn" className="hover:text-red-500">
                    Login
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

export default React.memo(Register);

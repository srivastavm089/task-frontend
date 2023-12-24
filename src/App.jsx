import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import CompD90 from "./Features/CompD90";
import CompD120 from "./Features/CompD120";
import CompD180 from "./Features/CompD180";
import Loader from "./components/Loader";
import MyContext from "./components/Context";
import "./App.css";
import Register from "./components/Register";

import Page404 from "./components/Page404";
import AdminDashBoard from "./components/AdminDashBoard";
import ResetPassword from "./components/ResetPasswrod";
// import { useNavigate } from "react-router-dom";
const App = () => {
  // const navigate = useNavigate()
  let check = JSON.parse(localStorage.getItem("token"));
  const [LogoutLoader, setLogoutLoader] = useState(false);
  const [checkData, setCheckData] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const [imageUploadLoader, setImageUploadLoader] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setCheckData(check);
  }, []);
  return (
    <MyContext.Provider
      value={{
        checkData,
        setCheckData,
        LogoutLoader,
        setLogoutLoader,
        loginLoader,
        setLoginLoader,
        message,
        setMessage,
        // imageUploadLoader,
        // setImageUploadLoader
      }}
    >
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/D90" element={<CompD90 />} />
          <Route path="/D120" element={<CompD120 />} />
          <Route path="/D180" element={<CompD180 />} />

          <Route path="/admin/dashboard" element={<AdminDashBoard />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
};

export default App

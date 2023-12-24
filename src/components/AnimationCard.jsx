import React from "react";
import "./animation.css";
import { Link } from "react-router-dom";
const AnimationCard = ({ name, path }) => {
  return (

    <Link to={path}>
    <div
      className="flex justify-center flex-col items-center w-36 h-36 sm:h-56 sm:w-56 bg-white    rounded-full cursor-pointer "
      id="animation-box"
    >
      <span className="text-2xl cursor-pointer font-bold"> {name}</span>
    </div>
    </Link>
  );
};

export default React.memo(AnimationCard);

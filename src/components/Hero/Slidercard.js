import React from "react";
import { Link } from "react-router-dom";

const SliderCard = ({ image }) => {
  return (
    <div className=" ">
      <img
        src={`/images/${image}.jpg`}
        alt=""
        className="w-full h-full object-cover fixed"
      />
      <div className="absolute top-1/3 md:left-24 left-6 space-y-4 z-10">
        <h1 className="text-3xl font-bold capitalize text-white md:w-[60%] w-[70%]">
          Stay with your dream & passion
        </h1>
        <p className="font-semibold text-white">
          photography is about capturing souls not smiles
        </p>

        <button className="bg-sky-500 text-white rounded-md px-4 py-2 capitalize hover:bg-sky-600 duration-300">
          <Link to="/allclasses">View Classes</Link>
        </button>
      </div>
    </div>
  );
};

export default SliderCard;

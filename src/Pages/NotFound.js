import React from "react";
import { Link } from "react-router-dom";

const NotfoundPages = () => {
  return (
    <div className="w-full h-full relative">
      <img
        src="/images/404Page.gif"
        alt="not-found"
        className="w-full h-full object-cover"
      />
      <Link to="/" className="absolute top-2 left-[44%]">
        <button className="bg-green-600 text-white px-4 py-3 rounded-md capitalize">
          go back to home
        </button>
      </Link>
    </div>
  );
};

export default NotfoundPages;

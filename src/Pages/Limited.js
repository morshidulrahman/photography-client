import React from "react";
import { Link } from "react-router-dom";
import Clock from "../components/Shared/Clock";
const Limited = () => {
  return (
    <section className={`dark:bg-gray-800 `}>
      <div className="container py-10 ">
        <div className="flex md:gap-4 flex-wrap items-center sm:justify-between gap-8 justify-center">
          <div className="text-center sm:text-start">
            <p className="text-black/90 font-semibold capitalize text-xl leading-6 dark:text-white">
              Limited offers
            </p>
            <p className="text-black/90 font-semibold my-2 capitalize text-xl dark:text-white">
              potret photography
            </p>
            <div>
              <Clock />
            </div>

            <button
              className={`text-white bg-gray-800 rounded-sm px-3 py-2 capitalize text-xs dark:bg-sky-600 font-semibold`}
            >
              <Link to="/allclasses">View Classes</Link>
            </button>
          </div>
          <img
            src="https://i.ibb.co/J5JTgxG/Portrait-Photography-Next-Level-04.jpg"
            alt="potret photography"
            className="w-[30%] hidden sm:flex rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Limited;

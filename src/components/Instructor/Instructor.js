import React, { useEffect, useState } from "react";
import InstructorCard from "./InstructorCard";
import Loader from "../Shared/Loader";
import { useQuery } from "react-query";
import axios from "axios";

const Instructor = () => {
  const { data: instractor = [], isLoading: loading } = useQuery(
    ["instructor"],
    async () => {
      const res = await axios.get(
        "https://server-ecru-five.vercel.app/instructors"
      );
      return res.data;
    }
  );
  return (
    <div className="container py-14">
      <h1 className="text-center capitalize font-bold text-3xl mb-10 dark:text-white">
        Popular Instructors
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instractor?.map((item, index) => (
              <InstructorCard item={item} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Instructor;

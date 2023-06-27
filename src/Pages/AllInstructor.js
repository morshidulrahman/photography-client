import React, { useEffect, useState } from "react";
import InstructorCard from "../components/Instructor/InstructorCard";
import Loader from "../components/Shared/Loader";
import SectionTitle from "../components/Shared/SectionTitle";
import axios from "axios";
import { useQuery } from "react-query";

const AllInstructor = () => {
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
    <div className="dark:bg-gray-800">
      <SectionTitle title="All Instructor" />
      <div className="container py-14">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-center">
              {instractor?.map((item, index) => (
                <InstructorCard item={item} key={index} email="i" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllInstructor;

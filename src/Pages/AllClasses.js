import React, { useEffect, useState } from "react";
import SectionTitle from "../components/Shared/SectionTitle";
import AllClassesCard from "../components/AllClasses/AllClassesCard";
import Loader from "../components/Shared/Loader";
import axios from "axios";
import { useQuery } from "react-query";

const AllClasses = () => {
  const { data: allclasses = [], isLoading: loading } = useQuery(
    ["classes"],
    async () => {
      const res = await axios.get(
        "https://server-ecru-five.vercel.app/classes"
      );
      const filterdata = res.data.filter((data) => data.status === "approved");
      return filterdata;
    }
  );
  return (
    <div className="dark:bg-gray-800">
      <SectionTitle title="All classes" />
      <div className="container py-14">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allclasses?.map((item, index) => (
                <AllClassesCard item={item} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllClasses;

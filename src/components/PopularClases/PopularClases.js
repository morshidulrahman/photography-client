import React, { useEffect, useState } from "react";
import PopularCard from "./PopularCard";
import Loader from "../Shared/Loader";
import axios from "axios";
import { useQuery } from "react-query";

const PopularClases = () => {
  const { data: PopularClases = [], isLoading: loading } = useQuery(
    ["classes"],
    async () => {
      const res = await axios.get(
        "https://server-ecru-five.vercel.app/classes"
      );
      return res.data;
    }
  );
  return (
    <div className="container py-14">
      <h1 className="text-center capitalize font-bold text-3xl mb-10 dark:text-white">
        Popular Clases
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PopularClases?.map((item, index) => (
              <PopularCard item={item} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularClases;

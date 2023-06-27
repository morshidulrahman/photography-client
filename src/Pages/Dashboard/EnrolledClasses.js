import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Shared/Loader";
import { AuthContext } from "../../Providers/AuthProviders";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EnrolledClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const {
    refetch,
    data: classes = [],
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/enrolledclasses?email=${user?.email}`);
      const filterdata = res.data.filter((data) => data.pstatus === "success");
      return filterdata;
    },
  });

  return (
    <div>
      {classesLoading ? (
        <Loader />
      ) : (
        <>
          {classes.length === 0 ? (
            <h1 className="font-bold dark:text-white text-3xl text-center my-5 capitalize">
              No classes found
            </h1>
          ) : (
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Class name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes?.map((data, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data.name}
                        </th>

                        <td className="px-6 py-4">{data.price}</td>
                        <td className="px-6 py-4">
                          {data.pstatus ? "successfull" : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledClasses;

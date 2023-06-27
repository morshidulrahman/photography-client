import React, { useContext } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Shared/Loader";
import { AuthContext } from "../../Providers/AuthProviders";

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["payment"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  return (
    <div>
      {classesLoading ? (
        <Loader />
      ) : (
        <>
          {classes.length === 0 ? (
            <h1 className="font-bold dark:text-white text-3xl text-center my-5 capitalize">
              No Payment history found
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
                        TransactionId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
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
                          {data.className}
                        </th>
                        <td className="px-6 py-4">{data.transactionId}</td>
                        <td className="px-6 py-4">{data.price}</td>
                        <td className="px-6 py-4">{formatDate(data.date)}</td>
                        <td className="px-6 py-4">{data.status}</td>
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

export default PaymentHistory;

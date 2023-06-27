import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import Loader from "../../../components/Shared/Loader";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
Modal.setAppElement("#root");

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [feedback, setfeedback] = useState("");
  const {
    refetch,
    data: classes = [],
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ["myclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myclasses?email=${user?.email}`);
      return res.data;
    },
  });

  const handlemodel = (feedback) => {
    setIsOpen(true);
    setfeedback(feedback);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
                        Total enrolled students
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Feedback
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
                        <td className="px-6 py-4">{data.numberOfStudents}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`font font-semibold capitalize borde text-white rounded-md p-1 ${
                              (data.status === "approved" &&
                                "bg-sky-600 border-sky-500") ||
                              (data.status === "deny" &&
                                "bg-red-600 border-red-500") ||
                              (data.status === "pending" &&
                                "bg-green-600 border-green-500")
                            }`}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {data.status === "approved" ? (
                            ""
                          ) : (
                            <b>
                              {data.feedback ? (
                                <button
                                  className={`font font-semibold capitalize border border-gray-300  rounded-md p-1 ${
                                    data.feedback && "bg-purple-600 text-white"
                                  }`}
                                  onClick={() => handlemodel(data.feedback)}
                                >
                                  feedback
                                </button>
                              ) : (
                                ""
                              )}
                            </b>
                          )}
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
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="bg-white rounded-xl  w-96 h-36 relative ">
          <span
            className="absolute top-0 right-0 "
            onClick={() => setIsOpen(false)}
          >
            <MdCancel size={24} />
          </span>
          <>
            <label className="block mb-2 text-gray-900 text-center text-2xl font-semibold">
              Your Feedback message
            </label>
            <textarea
              readOnly
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={feedback}
            />
          </>
        </div>
      </Modal>
    </div>
  );
};

export default MyClasses;

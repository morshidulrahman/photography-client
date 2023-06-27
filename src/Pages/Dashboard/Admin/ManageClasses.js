import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";

Modal.setAppElement("#root");

const Manageclasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [userid, setuserid] = useState("");

  const {
    refetch,
    data: classes = [],
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ["manageclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes`);
      return res.data;
    },
  });

  const updatestatus = (id, status) => {
    fetch(
      `https://server-ecru-five.vercel.app/classes/${id}?status=${status}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success(`class has ${status}`);
        }
      });
  };

  const handlemodel = (id) => {
    setIsOpen(true);
    setuserid(id);
  };

  const updateFeedback = () => {
    fetch(`https://server-ecru-five.vercel.app/feedbackclasses/${userid}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          setIsOpen(false);
          toast.success(`feedback updated successfully`);
        }
      });
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
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Class name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instructor name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instructor Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Available seats
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
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
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={data.image}
                            alt={data.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4">{data.instructorName}</td>
                        <td className="px-6 py-4">{data?.instructorEmail}</td>
                        <td className="px-6 py-4">{data.availableSeats}</td>
                        <td className="px-6 py-4">{data.price}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            disabled={
                              data.status === "approved" ||
                              data.status === "deny"
                            }
                            onClick={() => updatestatus(data._id, "approved")}
                            className={`font font-semibold capitalize border border-gray-300  rounded-md p-1 ${
                              data.status === "approved"
                                ? "bg-sky-600 text-white border-sky-400"
                                : " "
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            disabled={true}
                            className={`font font-semibold capitalize border border-gray-300  rounded-md p-1 ${
                              data.status === "pending"
                                ? "bg-green-600 text-white border-green-400"
                                : " "
                            }`}
                          >
                            pending
                          </button>
                          <button
                            onClick={() => updatestatus(data._id, "deny")}
                            className={`font font-semibold capitalize border border-gray-300  rounded-md p-1 ${
                              data.status === "deny"
                                ? "bg-red-600 text-white border-red-600"
                                : " "
                            }`}
                            disabled={
                              data.status === "deny" ||
                              data.status === "approved"
                            }
                          >
                            Deny
                          </button>
                          {data.status !== "approved" && (
                            <button
                              onClick={() => handlemodel(data._id)}
                              className={`font font-semibold capitalize border border-gray-300  rounded-md p-1 ${
                                data.feedback
                                  ? "bg-purple-600 text-white border-purple-500"
                                  : " "
                              }`}
                            >
                              feedback
                            </button>
                          )}
                        </td>
                        {/* <td className="px-6 py-4">
                          {data.status === "denied" ? (
                            <span className="font font-semibold capitalize border border-gray-300  rounded-md p-1">
                              feedback
                            </span>
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      <div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div className="bg-white rounded-lg  w-96 h-56 relative ">
            <span
              className="absolute top-0 right-0 "
              onClick={() => setIsOpen(false)}
            >
              <MdCancel size={24} />
            </span>
            <>
              <label className="block mb-2 text-gray-900 text-center text-2xl font-semibold">
                Your message
              </label>
              <textarea
                onChange={(e) => setmessage(e.target.value)}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                defaultValue={""}
              />
              <button
                onClick={updateFeedback}
                className="bg-sky-600 px-4 py-2 rounded-lg text-white capitalize my-4 "
              >
                send feedback
              </button>
            </>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Manageclasses;

import React from "react";
import Loader from "../../components/Shared/Loader";
import { FaCcAmazonPay } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useSelectedClasses from "../../hooks/useSelectedClasses";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SelectedClass = () => {
  const [classes, refetch, classesLoading] = useSelectedClasses();
  const navigate = useNavigate();

  const handleDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://server-ecru-five.vercel.app/selectedclasses/${id}`)
          .then((data) => {
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleClick = (data) => {
    navigate("/dashboard/payment", { state: { data: data } });
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
                        availableSeats
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Pay
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
                        <td className="px-6 py-4">{data.availableSeats}</td>
                        <td
                          className="px-6 py-4"
                          onClick={() => handleDeleted(data._id)}
                        >
                          <AiFillDelete color="red" size={24} />
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => handleClick(data)}
                            className="text-sky-600"
                          >
                            <FaCcAmazonPay size={24} />
                          </span>
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

export default SelectedClass;

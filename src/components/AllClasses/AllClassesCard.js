import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { toast } from "react-toastify";
import axios from "axios";

const AllClassesCard = ({ item }) => {
  const { user } = useContext(AuthContext);

  const {
    numberOfStudents,
    price,
    availableSeats,
    name,
    image,
    instructorName,
    _id,
  } = item;

  const handleclick = () => {
    const items = {
      numberOfStudents,
      price,
      availableSeats,
      name,
      selectedClassesid: _id,
      email: user?.email,
    };
    if (!user) {
      toast.error("You have to Login before selecting the course");
      return;
    }
    axios
      .post("https://server-ecru-five.vercel.app/selectedclasses", items)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Course Selected Successfully");
          setSelectedId(_id);
          refetch();
        }
      });
  };
  return (
    <div
      className={`max-w-sm  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
        availableSeats === 0 ? "bg-red-600 dark:bg-red-600 " : "bg-white"
      }`}
    >
      <img
        className="rounded-t-lg h-60 w-full object-cover"
        src={image}
        alt={name}
        loading="lazy"
      />

      <div className="p-5 dark:text-white">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {instructorName}
        </h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-200 ">
          {numberOfStudents} students
        </p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-200">
          seats : {availableSeats}
        </p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-200">
          $ {price}
        </p>
        <button
          disabled={availableSeats == 0}
          onClick={handleclick}
          className="bg-blue-700 text-white rounded-md text-center py-3 font-semibold w-full my-2 hover:bg-blue-600 duration-300 capitalize"
        >
          {availableSeats == 0 ? "Course has no available" : "select course"}
        </button>
      </div>
    </div>
  );
};

export default AllClassesCard;

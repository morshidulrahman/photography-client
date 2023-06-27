import React from "react";

const PopularCard = ({ item }) => {
  const { numberOfStudents, price, availableSeats, name, image } = item;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-60 w-full object-cover"
        src={image}
        alt={name}
        loading="lazy"
      />

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          {numberOfStudents} students
        </p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          seats : {availableSeats}
        </p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          $ {price}
        </p>
      </div>
    </div>
  );
};

export default PopularCard;

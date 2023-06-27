import React from "react";

const InstructorCard = ({ item, email }) => {
  const { image, name, classesTaken, email: insemail } = item;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-60 w-full object-cover"
        src={image}
        alt={name}
        loading="lazy"
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        {email && (
          <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
            {insemail}
          </h5>
        )}
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          ClasesTaken : {classesTaken}
        </p>
      </div>
    </div>
  );
};

export default InstructorCard;

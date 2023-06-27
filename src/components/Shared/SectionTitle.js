import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="bg-[url(https://i.ibb.co/KhcXd40/Beginners-Guide-to-Night-Photography.jpg)] w-full h-60 bg-black bg-opacity-10 flex justify-center items-center">
      <h1 className="text-white text-3xl font-bold text-center capitalize">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;

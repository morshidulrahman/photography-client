import React from "react";
import { Bars } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="flex w-full justify-center items-center ">
      <Bars height="80" width="80" ariaLabel="bars-loading" visible={true} />
    </div>
  );
};

export default Loader;

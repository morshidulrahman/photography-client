import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Loader from "../../components/Shared/Loader";

const DashboardFront = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="flex justify-center w-full flex-col space-y-4 items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <img
              src={user?.photoURL}
              alt=""
              className="w-40 h-40 rounded-md object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-700 w-[40%] text-center">
            {" "}
            Welcome to your Dashborad {user?.displayName}
          </h1>
        </>
      )}
    </div>
  );
};

export default DashboardFront;

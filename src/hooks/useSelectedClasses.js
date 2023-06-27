import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProviders";
import { useQuery } from "react-query";

const useSelectedClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch,
    data: classes = [],
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/selectedclasses?email=${user?.email}`);
      return res.data;
    },
  });

  return [classes, refetch, classesLoading];
};

export default useSelectedClasses;

import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Providers/AuthProviders";
const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGooglelogin = () => {
    googleSignIn().then((result) => {
      const currentUser = result.user;

      const saveUser = {
        name: currentUser.displayName,
        email: currentUser.email,
      };
      fetch("https://server-ecru-five.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div
      className="border border-gray-500 rounded-md py-3 my-2 flex justify-center items-center hover:bg-gray-700 duration-300"
      onClick={handleGooglelogin}
    >
      <FcGoogle size={24} />
    </div>
  );
};

export default SocialLogin;

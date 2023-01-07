import React, { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
const Context = createContext();

export const UserContext = ({ children }) => {
  const router = useRouter();

  const createUser = async (userForm) => {
    let userConfirmation = false;
    userForm.email = userForm.email.toLowerCase();
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user`,
        userForm
      )
      .then(async (res) => {
        const cookies = new Cookies();
        cookies.set("token", res.data.token, { path: "/" });
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        userConfirmation = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
    return userConfirmation;
  };

  const userAuthentication = async (userForm) => {
    userForm.email = userForm.email.toLowerCase();
    let userConfirmation = false;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/user-authentication`,
        userForm
      )
      .then(async (res) => {
        const cookies = new Cookies();
        cookies.set("token", res.data.token, { path: "/" });
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        userConfirmation = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
    return userConfirmation;
  };

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    router.push("/");
  };

  return (
    <Context.Provider
      value={{
        createUser,
        userAuthentication,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  return useContext(Context);
};

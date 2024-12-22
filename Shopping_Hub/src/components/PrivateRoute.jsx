import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import Loader from "./Loader";

export const PrivateRoute = ({ children }) => {
  const { value } = useContext(MyContext);
  console.log(value.userLogin, value.loader);

  if (value.loader) {
    return <Loader />;
  }

  return value.userLogin ? children : <Navigate to="/login" replace />;
};

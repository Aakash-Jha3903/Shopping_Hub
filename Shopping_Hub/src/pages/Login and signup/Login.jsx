import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  doSignInwiwthEmailAndPassword,
  doSignWithGoogle,
} from "../../firebase/auth";
import Loader from "../../components/Loader";
import MyContext from "../../context/MyContext";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { loading, setLoading } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isSignIn) {
      setSignIn(true);
      try {
        const result = await doSignInwiwthEmailAndPassword(email, password);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.message);
        setSignIn(false);
        setLoading(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isSignIn) {
      setSignIn(true);
      try {
        await doSignWithGoogle();
        navigate("/");
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.message);
        setSignIn(false);
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex bg-white text-zinc-900 overflow-hidden min-h-screen">
      {loading && <Loader />}
      <div className="w-1/2 h-screen hidden lg:block">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign2.jpg)",
          }}
        ></div>
      </div>
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <h2 className="text-indigo-900 text-3xl leading-none font-bold mb-6">
            Log In
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="flex flex-col mb-6 mx-2">
                  {/* <label htmlFor="email" className="mb-2">
              Email
            </label> */}
                  <input
                    type="email"
                    className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col mb-6 mx-2">
                  {/* <label htmlFor="password" className="mb-2">
              Password
            </label> */}
                  <input
                    type="password"
                    className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-800 text-white px-7 py-3 rounded w-full"
              onClick={onSubmit}
            >
              Log In
            </button>

            <div className="relative">
              <hr className="my-6" />
              <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ">
                Or
              </span>
            </div>

            {/* <button className="w-full flex justify-center items-center bg-blue-600 rounded py-3 px-5 mb-3">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-white text-2xl"
              />
              <span className="w-full text-center text-white">
                Continue with Facebook
              </span>
            </button> */}
            <button
              className="w-full flex justify-center items-center bg-red-500 rounded py-3 px-5 mb-3 "
              onClick={onGoogleSignIn}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-white text-2xl"
              />
              <span className="w-full text-center text-white">
                Continue with Google
              </span>
            </button>

            <div className="text-center mt-6">
              <p className="mb-0 mr-2 opacity-50">Don't have an account?</p>
              <Link
                to={"/signup"}
                className="text-gray-700 hover:text-indigo-800 hover:font-medium transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

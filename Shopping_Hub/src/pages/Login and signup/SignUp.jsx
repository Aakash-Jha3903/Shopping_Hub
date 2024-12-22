import React, { useState, Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyContext from "../../context/MyContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import Loader from "../../components/Loader";

const SocialLoginButton = () => (
  <Fragment>
    <button className="w-full flex justify-center items-center bg-blue-600 rounded py-3 px-5 mb-3">
      <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl" />
      <span className="w-full text-center text-white">
        Continue with Facebook
      </span>
    </button>
    <button className="w-full flex justify-center items-center bg-red-500 rounded py-3 px-5 mb-3">
      <FontAwesomeIcon icon={faGoogle} className="text-white text-2xl" />
      <span className="w-full text-center text-white">
        Continue with Google
      </span>
    </button>
  </Fragment>
);

const SignUpForm = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const { loading, setLoading } = context;
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    if (
      firstName === "" ||
      lastName === "" ||
      dob === "" ||
      email === "" ||
      passwordConfirmation === "" ||
      password === ""
    ) {
      toast.error("Please fill in all the details");
      setLoading(false);
      return;
    }

    try {
      const users = await doCreateUserWithEmailAndPassword(email, password);

      const user = {
        name: firstName + " " + lastName,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
        dob: dob,
        password: password,
        cart: [],
      };
      const userRef = doc(fireDB, "users", user.uid);
      await setDoc(userRef, user, { merge: true });
      toast.success("Signup Successfully");
      setFirstName("");
      setlastName("");
      setemail("");
      setPassword("");
      setPasswordConfirmation("");
      setDob("");
      setLoading(false);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Signup failed, please try again");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loader />}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            {/* <label htmlFor="first-name" className="mb-2">
              First Name
            </label> */}
            <input
              type="text"
              className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100"
              id="first-name"
              placeholder="Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            {/* <label htmlFor="last-name" className="mb-2">
              Last Name
            </label> */}
            <input
              type="text"
              className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100"
              id="last-name"
              placeholder="Your Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-6 mx-2">
            {/* <label htmlFor="birth-date" className="mb-2">
              Birth date
            </label> */}
            <input
              type="date"
              className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 w-full text-slate-400"
              id="birth-date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>
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
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
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
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            {/* <label htmlFor="con-pass" className="mb-2">
              Confirm Password
            </label> */}
            <input
              type="password"
              className="bg-blue-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100"
              id="con-pass"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="form-check mx-2">
          <input className="rounded-lg" type="checkbox" value="" id="agree" />
          <label className="rounded-lg" htmlFor="agree">
            {" "}
            I accept the{" "}
            <a href="#!" className="underline">
              terms & conditions
            </a>
            ,{" "}
            <a href="#!" className="underline">
              privacy policy
            </a>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-indigo-800 text-white px-7 py-3 rounded w-full"
        // onClick={signupAction}
      >
        Sign Up
      </button>

      {/* <div className="relative">
        <hr className="my-6" />
        <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ">
          Or
        </span>
      </div> */}

      {/* <SocialLoginButton /> */}

      <div className="text-center mt-6 ">
        <p className="mb-0 mr-2 opacity-50">Already have an account?</p>
        <Link
          to={"/login"}
          className="text-gray-700 hover:text-indigo-800 hover:font-medium transition-all "
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

const SignUp = () => {
  return (
    <section className="flex bg-white text-zinc-900 overflow-hidden min-h-screen">
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
          <h2 className="text-indigo-900 text-3xl leading-none font-bold mb-6 ">
            Sign Up
          </h2>
          <SignUpForm />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignUp;

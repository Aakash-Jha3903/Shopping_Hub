// components/Footer.js
import React, { useContext } from "react";
import {
  // BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import MyContext from "../context/MyContext";

const Footer = () => {
  const { mode } = useContext(MyContext);

  return (
    <footer
      className={`py-8 px-10 ${
        mode === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-gray-700"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span
            className={`ml-3 text-2xl font-bold ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Shopping-Hub
          </span>
        </div>
        <div className="flex space-x-8 mb-4 md:mb-0">
          {["Product", "Order", "Cart", "Profile"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-medium transform hover:translate-y-1 transition duration-300 ${
                mode === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            className="hover:text-white"
            aria-label="Twitter"
          >
            <div
              className={`p-2 rounded-full ${
                mode === "dark" ? "hover:bg-blue-500" : "hover:bg-blue-400"
              }`}
            >
              <BsTwitter size={18} />
            </div>
          </a>
          <a
            href="https://facebook.com"
            className="hover:text-white"
            aria-label="Facebook"
          >
            <div
              className={`p-2 rounded-full ${
                mode === "dark" ? "hover:bg-blue-500" : "hover:bg-blue-400"
              }`}
            >
              <BsFacebook size={18} />
            </div>
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-white"
            aria-label="Instagram"
          >
            <div
              className={`p-2 rounded-full ${
                mode === "dark" ? "hover:bg-blue-500" : "hover:bg-blue-400"
              }`}
            >
              <BsInstagram size={18} />
            </div>
          </a>
          <a
            href="https://github.com"
            className="hover:text-white"
            aria-label="GitHub"
          >
            <div
              className={`p-2 rounded-full ${
                mode === "dark" ? "hover:bg-blue-500" : "hover:bg-blue-400"
              }`}
            >
              <BsGithub size={18} />
            </div>
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        © Copyright 2024, All Rights Reserved by Shopping-Hub
      </div>
    </footer>
  );
};

export default Footer;

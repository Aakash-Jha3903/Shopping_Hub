import { useContext, Fragment, useState } from "react";
import MyContext from "../context/MyContext";
import { Link, useNavigate } from "react-router-dom";
// import { BsFillCloudSunFill } from "react-icons/bs";
// import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoMoonOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { MdLogout } from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { LiaBoxSolid } from "react-icons/lia";
import { HiMiniMoon } from "react-icons/hi2";
import { HiOutlineSun } from "react-icons/hi";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  Switch,
} from "@headlessui/react";
import AccountMenu from "./AccountMenu";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { doSignOut } from "../firebase/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { mode, toggleMode, value } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const handleToggleMode = () => {
    setEnabled(!enabled);
    toggleMode();
  };
  const cartItem = useSelector((state) => state.cart);
  const noOfCartItem = cartItem.length;
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border:
        mode === "light"
          ? "2px solid rgb(243 244 246)"
          : "2px solid rgb(40, 44, 52)",
      padding: "0 4px",
      backgroundColor: "red",
      // color: mode === "dark" ? "black" : "white",
    },
  }));

  const handleLogout = async () => {
    await doSignOut();
    // console.log("sing out");
    navigate("/login");
  };

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <div className=" bg-white sticky top-0 z-50">
        {/* mobile */}
        <Transition show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10   lg:hidden"
            onClose={() => setOpen(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25 " />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel
                  className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex px-4 pb-4 pt-[120px] justify-between">
                    <div className="h-10 w-10 rounded-full bg-slate-500 "></div>
                    <button
                      type="button"
                      className=" inline-flex items-center justify-center px-3  text-gray-400 hover:bg-red-500 hover:text-white transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="space-y-6 border-t border-gray-500 px-4 py-6">
                    <div className="flex items-center gap-4">
                      <LiaBoxSolid />
                      <Link
                        to={"/allproducts"}
                        className="-m-2 block p-2 text-gray-900 "
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        All Products
                      </Link>
                    </div>

                    <div className="flex items-center gap-4">
                      <TbShoppingCartCheck />

                      <Link
                        to={"/order"}
                        style={{ color: mode === "dark" ? "white" : "" }}
                        className="-m-2 block p-2 text-gray-900"
                      >
                        Order
                      </Link>
                    </div>

                    {value.userLogin ? (
                      <div
                        className="flex items-center gap-4 cursor-pointer "
                        onClick={handleLogout}
                      >
                        <MdLogout />
                        <a
                          className="-m-2 block p-2  text-gray-900 cursor-pointer"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          Logout
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex  justify-between">
                      <div className="flex gap-4 items-center">
                        <IoMoonOutline />

                        <p>Dark Mode</p>
                      </div>
                      <Switch
                        checked={enabled}
                        onChange={handleToggleMode}
                        className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none 
              data-[focus]:outline-1 data-[focus]:outline-white 
              ${mode === "light" ? "bg-gray-600" : "bg-white/10"}`}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg shadow-gray-700 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                    </div>
                  </div>

                  <div className="border-t border-gray-500 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="img/indiaflag.png"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span
                        className="ml-3 block text-base font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        INDIA
                      </span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
        {/* desktop */}
        <header className="relative bg-white">
          <p
            className="flex h-10 items-center justify-center bg-blue-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
            // style={{
            //   backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "",
            //   color: mode === "dark" ? "white" : "",
            // }}
          >
            Get free delivery on orders over ₹300
          </p>
        </header>
        <nav
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(!open)}
              style={{
                backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to={"/"} className="flex">
                <div className="flex ">
                  <h1
                    className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Shopping-Hub
                  </h1>
                </div>
              </Link>
            </div>
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to={"/allproducts"}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  All Products
                </Link>
                <Link
                  to={"/order"}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order
                </Link>
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <AccountMenu onClick={handleLogout} />
              </div>
              <div className="hidden lg:ml-8 lg:flex"></div>
              {/* button of dark mode  */}
              <div className="hidden lg:flex lg:ml-6">
                <button className="transition-all" onClick={toggleMode}>
                  {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                  {mode === "light" ? (
                    <HiOutlineSun
                      className="transition-all duration-100 ease-in-out"
                      size={30}
                    />
                  ) : (
                    <HiMiniMoon
                      className="transition-all duration-100 ease-in-out"
                      size={26}
                    />
                  )}
                </button>
              </div>
              {/* cart  */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to={"/cart"}
                  className="group -m-2 flex items-center p-2"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={noOfCartItem} color="secondary">
                      <ShoppingCartIcon
                        style={{ color: mode === "dark" ? "white" : "" }}
                      />
                    </StyledBadge>
                  </IconButton>
                  {/* <span className="sr-only">items in cart, view bag</span> */}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </IconContext.Provider>
  );
};

export default Navbar;

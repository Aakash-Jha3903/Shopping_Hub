import { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Error from "./pages/Error/Error";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import MyContext from "./context/MyContext";
import Products from "./pages/Products/Products";
import Login from "./pages/Login and signup/Login";
import SignUp from "./pages/Login and signup/SignUp";
import ProductsInfo from "./components/ProductsInfo";
import { auth } from "./firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { ProductPageList } from "./pages/ProductPageList/ProductPageList";

// import NoPage from "./pages/Error/NoPage";

function App() {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLogin(true);
      } else {
        setCurrentUser(null);
        setUserLogin(false);
      }
      setLoader(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLogin,
    loader,
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/order",
          element: (
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },

        {
          path: "/allproducts",
          element: <ProductsInfo />,
        },
        {
          path: "/product/:productId",
          element: <Products />,
        },
        {
          path: "/search/:productCatId",
          element: <ProductPageList />,
        },
      ],
    },
  ]);

  return (
    <MyContext.Provider
      value={{ mode, toggleMode, loading, setLoading, value }}
    >
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;

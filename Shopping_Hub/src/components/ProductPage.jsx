import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import MyContext from "../context/MyContext";
import { useDealsQuery } from "../service/product";
import Loader from "../components/Loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Oval } from "react-loader-spinner";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const truncateTitle = (title, length = 30) => {
  if (!title) return "N/A";
  return title.length <= length ? title : title.substring(0, length) + "...";
};

const Product = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const { mode } = useContext(MyContext);
  const { data: dealsData, isLoading: dealsLoading } = useDealsQuery();

  const handleAddToCart = (product) => {
    const isInCart = cartItem.some(
      (item) => item.asin === product?.product_asin
    );
    if (product && !isInCart) {
      dispatch(addToCart(product));
    }
  };
  useEffect(() => {
    console.log(dealsData?.data?.deals);
    console.log(cartItem);
  }, [dealsLoading, dealsData, cartItem]);


  return (
    <section
      className={`ezy__epgrid8 light py-14 md:py-24 ${
        mode === "dark"
          ? "bg-[#0b1727] text-white border border-slate-700"
          : "bg-white text-zinc-900"
      } relative overflow-hidden z-10`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-end pb-5">
          <h2 className="text-3xl font-bold pb-2">Our Latest Collection</h2>
          <span className="font-medium text-blue-600">
            <a href="#">See more</a>
          </span>
        </div>
        <div className="">
          {!dealsLoading ? (
            <Carousel responsive={responsive}>
              {dealsData?.data?.deals.map((deal) => {
                const isInCart = cartItem.some(
                  (item) => item.asin === deal?.product_asin
                );
                return (
                  <div key={deal?.product_asin}>
                    <div
                      className={`rounded-lg overflow-hidden max-w-sm mx-auto my-4 border relative ${
                        mode === "dark"
                          ? "bg-[#0b1727] text-white border-slate-700"
                          : "bg-white text-zinc-900 border-gray-300"
                      }`}
                    >
                      <div className="absolute top-2 right-2 bg-red-600 p-2 rounded-full">
                        <p className="text-white px-1">{deal?.deal_badge}</p>
                      </div>
                      <div className="w-full bg-white py-3">
                        <img
                          src={deal?.deal_photo}
                          alt={deal?.deal_title}
                          className="w-full h-64 object-contain"
                        />
                      </div>
                      <div className="px-5 pt-5 pb-8">
                        <a href="#!">
                          <h5
                            className={`text-[17px] font-medium hover:underline mb-1 ${
                              mode === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            {truncateTitle(deal?.deal_title) || "N/A"}
                          </h5>
                        </a>
                        <div className="flex justify-between items-end">
                          <h6 className="text-sm font-medium">
                            Stock:{" "}
                            <span className="text-emerald-500 font-normal">
                              {deal?.deal_state}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;

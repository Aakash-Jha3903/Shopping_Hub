import { useParams, Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";
import MyContext from "../../context/MyContext";
import { useProductSearchQuery } from "../../service/product";
import Rating from "../../components/Rating";
import { Oval } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addItemToCart } from "../../service/firebaseCart";

export const ProductPageList = () => {
  const { productCatId } = useParams();
  const { mode } = useContext(MyContext);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  console.log(productCatId);

  // data fetch from the api search api
  const {
    data: searchData,
    // error: searchError,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
  } = useProductSearchQuery({ search: productCatId, page: page });

  // store the data in the product state
  useEffect(() => {
    if (searchData?.data?.products) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...searchData.data.products,
      ]);
      setIsLoading(false);
    }
  }, [searchData]);

  // handle add to cart event
  const handleAddToCart = (product) => {
    console.log("added to cart", product);
    const isInCart = cartItem.some(
      (item) => item.asin === product?.product_asin
    );
    if (product && !isInCart) {
      dispatch(addItemToCart(product));
    }
  };

  // handle scroll event throttelling
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoading &&
        !searchIsFetching
      ) {
        setPage((prevPage) => prevPage + 1);
        setIsLoading(true);
      }
    }, 200),
    [isLoading, searchIsFetching]
  );

  // handle scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // useEffect(() => {
  //   if (!searchIsFetching && isLoading) {
  //     setIsLoading(false);
  //   }
  // }, [searchIsFetching, isLoading]);

  // useEffect(() => {
  //   if (searchIsFetching) {
  //     console.log("trueeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   }
  // }, [searchIsFetching]);

  useEffect(() => {
    console.log(cartItem);
  }, [cartItem, isLoading]);

  const truncateTitle = (title, length = 30) => {
    if (!title) return "N/A";
    return title.length <= length ? title : title.substring(0, length) + "...";
  };

  if (searchIsLoading) {
    return (
      <div className="flex justify-center my-4">
        <Oval
          visible={true}
          height="30"
          width="30"
          color="rgb(37 99 253)"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          strokeWidth="5"
        />
      </div>
    );
  }
  // console.log(searchData);
  // console.log(page);
  // console.log(isLoading);
  // console.log(searchIsLoading);

  return (
    <div className="">
      <div className="px-10 mt-5">
        <h1
          className={`text-[30px] font-bold hover:underline mb-1 ${
            mode === "dark" ? "text-white" : "text-black"
          }`}
        >
          {productCatId}
        </h1>
      </div>
      <div className="">
        <div className="grid grid-cols-12 gap-6">
          {products?.map((deal) => {
            const isInCart = cartItem.some((item) => item.asin === deal?.asin);
            return (
              <div
                className="col-span-12 md:col-span-6 xl:col-span-4"
                key={deal?.product_title}
              >
                {/* <Link to={`/product/${deal?.asin}`}> */}
                {/* <h2>{data?.deal_title}</h2> */}
                <div
                  className={`  rounded-lg overflow-hidden max-w-sm mx-auto my-4 border ${
                    mode === "dark"
                      ? "bg-[#0b1727] text-white  border-slate-700"
                      : "bg-white text-zinc-900   border-gray-300"
                  }`}
                >
                  <div className="w-full bg-white py-3">
                    <img
                      src={deal?.product_photo}
                      alt={deal?.product_title}
                      className="w-full h-64 object-contain  "
                    />
                  </div>
                  <div className="px-5 pt-5 pb-8 ">
                    {/* <h2 className="text-lg font-semibold">{deal?.deal_title}</h2> */}
                    <a href="#!">
                      <h5
                        className={`text-[20px] font-medium hover:underline mb-1 ${
                          mode === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {truncateTitle(deal?.product_title) || "N/A"}
                      </h5>
                    </a>
                    <p className="mt-2 text-gray-600">
                      <div className="py-2 flex items-center">
                        <h5 className="text-2xl font-medium text-blue-600">
                          {deal?.product_price}
                        </h5>
                      </div>
                    </p>
                    <div className="flex gap-3">
                      <Rating rating={deal?.product_star_rating} />
                      <p className=" text-gray-600 dark:text-gray-400">
                        {deal?.product_star_rating} ({deal?.product_num_ratings}{" "}
                        ratings)
                      </p>
                    </div>
                    <div className="flex justify-between items-center ">
                      <p className=" text-gray-600 dark:text-gray-400">
                        {truncateTitle(deal.delivery)}
                      </p>
                      <div className="flex">
                        <button
                          className={`text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded py-1 px-3 text-sm mr-2 ${
                            mode === "dark" ? "dark:bg-slate-800" : "bg-white"
                          }`}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <button
                          className={`border ${
                            isInCart
                              ? "bg-gray-400 border-gary-400"
                              : "bg-blue-600 border-blue-600"
                          } text-white hover:bg-opacity-90 py-1 px-3 rounded text-sm`}
                          onClick={() => handleAddToCart(deal)}
                          disabled={isInCart}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="flex justify-center my-4">
            <Oval
              visible={true}
              height="30"
              width="30"
              color="rgb(37 99 253)"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              strokeWidth="4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MyContext from "../../context/MyContext";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";
import {
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../service/firebaseCart";

const QtyField = ({ value, onIncrease, onDecrease }) => {
  const { mode } = useContext(MyContext);

  return (
    <div
      className={`h-10 border rounded-full flex w-36 relative mt-4 overflow-hidden ${
        mode === "dark" ? "dark:border-slate-700" : ""
      }`}
    >
      <button
        className={`px-4 py-1 inline-flex justify-center border-r text-blue-600 hover:bg-blue-600 hover:bg-opacity-10 ${
          mode === "dark" ? "dark:border-slate-700" : ""
        }`}
        type="button"
        onClick={onDecrease}
      >
        -
      </button>
      <input
        type="text"
        className="px-4 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none"
        value={value}
        readOnly
      />
      <button
        className={`px-4 py-1 inline-flex justify-center border-l text-blue-600 hover:bg-blue-600 hover:bg-opacity-10 ${
          mode === "dark" ? "dark:border-slate-700" : ""
        }`}
        type="button"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

QtyField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

const ProductItem = ({ item }) => {
  const { mode } = useContext(MyContext);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(item.asin));
    // increaseItemQuantity(item.asin);
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(item.asin));
    // decreaseItemQuantity(item.asin);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.asin));
    // removeItemFromCart(item.asin);
  };

  const convertCurrencyStringToInt = (currencyString) => {
    // Remove the dollar sign, commas, and any non-numeric characters
    const cleanedString = currencyString.replace(/[^0-9.-]+/g, "");
    // Convert the cleaned string to a number
    return parseInt(cleanedString, 10);
  };

  const price = convertCurrencyStringToInt(item?.product_minimum_offer_price);
  const quantity = item?.quantity;
  const totalPrice = price * parseInt(quantity);
  console.log(totalPrice);

  return (
    <div
      className={`rounded-xl flex flex-col md:flex-row items-start gap-2 p-2 md:p-6 mb-4 relative ${
        mode === "dark" ? "bg-slate-800" : "bg-blue-50"
      }`}
    >
      {/* <!-- image --> */}
      <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
        <a href="#!">
          <img
            src={item.product_photo}
            alt=""
            className="max-w-full h-auto rounded-xl mx-auto"
          />
        </a>
      </div>

      <div className="flex flex-1">
        {/* <!-- product details --> */}
        <div className="flex-1">
          <div className="text-base md:text-lg hover:text-blue-600 mb-4">
            <a href="#!">{item.product_title}</a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-600">
              Rs. {item.product_minimum_offer_price}
            </h3>
            <QtyField
              value={item.quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          </div>
        </div>
        {/* <!-- delete button --> */}
        <div className="ml-4">
          <button
            className={`w-10 h-10 bg-sky-100 text-blue-600 inline-flex justify-center items-center rounded-full
          ${mode === "dark" ? "bg-slate-900" : ""}`}
            onClick={handleRemoveFromCart}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 ">
        <p className="text-xl font-bold">
          Total:{" "}
          <span className="text-xl font-bold text-blue-600">₹{totalPrice}</span>
        </p>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductItem;

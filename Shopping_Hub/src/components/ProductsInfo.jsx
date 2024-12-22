import React, { useContext, Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MyContext from "../context/MyContext";

const product = {
  title: "Large Lazy Inflatable Flocking Sofa",
  previews: [
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/sofa3.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/sofa3.png",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/sofa2.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/sofa2.png",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/sofa5.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/sofa5.png",
    },
  ],
  rating: 5.0,
  rateCount: 1256,
  price: 7230,
  colorVariants: [
    { label: "Multi", value: "Multi", title: "Multi" },
    { label: "Red", value: "Red", title: "Red" },
    { label: "Green", value: "Green", title: "Green" },
    { label: "Blue", value: "Blue", title: "Blue" },
    { label: "Black", value: "Black", title: "Black" },
  ],
  sizeVariants: [
    { label: "XXS", value: "SSX", title: "Extra Extra Small" },
    { label: "XS", value: "XS", title: "Extra Small" },
    { label: "S", value: "S", title: "Small" },
    { label: "M", value: "M", title: "Medium" },
    { label: "L", value: "L", title: "Large" },
    { label: "XL", value: "XL", title: "Extra Large" },
    { label: "XXL", value: "XXL", title: "Extra Extra Large" },
    {
      label: "XXXL",
      value: "XXXL",
      title: "Extra extra extra large",
      disabled: true,
    },
  ],
};

const ProductPreviews = ({ previews }) => {
  const { mode } = useContext(MyContext);
  const [index, setIndex] = useState(0);

  return (
    <Fragment>
      <div className="relative">
        <div className="text-center mb-4 md:p-6">
          <img
            src={previews[index].previewUrl}
            alt=""
            className="max-w-full h-auto"
          />
        </div>

        <ul className="flex">
          {previews.map((preview, i) => (
            <a href="#!" key={i}>
              <li
                className={`w-24 h-24 inline-flex justify-center items-center border rounded-lg mr-2.5 p-2 ${
                  mode === "dark"
                    ? "bg-slate-800 border-blue-600 border-opacity-20"
                    : "bg-blue-50 border-blue-200"
                }`}
                onClick={() => setIndex(i)}
              >
                <img
                  src={preview.thumbUrl}
                  alt=""
                  className="max-w-full h-auto"
                />
              </li>
            </a>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProductPreviews.propTypes = {
  previews: PropTypes.array.isRequired,
};

const QtyField = ({ name, value, onChange }) => {
  const { mode } = useContext(MyContext);
  const qtyControl = (qty) =>
    onChange({
      target: {
        name,
        type: "radio",
        value: qty < 1 ? 1 : qty,
      },
    });

  return (
    <div
      className={`h-11 border rounded-full flex w-36 relative mt-4 overflow-hidden ${
        mode === "dark" ? "border-slate-700" : "border-blue-200"
      }`}
    >
      <button
        className={`w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-r text-blue-600 hover:bg-blue-600 hover:bg-opacity-20 ${
          mode === "dark" ? "border-slate-700" : "border-blue-200"
        }`}
        type="button"
        onClick={() => qtyControl(parseInt(value) - 1)}
      >
        -
      </button>
      <input
        className="text-lg font-bold px-4 pl-5 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none"
        type="text"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(e.target.value)}
      />
      <button
        className={`w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-l text-blue-600 hover:bg-blue-600 hover:bg-opacity-10 ${
          mode === "dark" ? "border-slate-700" : "border-blue-200"
        }`}
        type="button"
        onClick={() => qtyControl(parseInt(value) + 1)}
      >
        +
      </button>
    </div>
  );
};

QtyField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

const ColorVariant = () => {
  const [selectedColor, setSelectedColor] = useState("Multi");
  const { mode } = useContext(MyContext);

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  return (
    <>
      <div className="mb-6">
        <h5 className="font-medium mb-2">
          Color:{" "}
          <span className="opacity-50">
            {selectedColor &&
              product.colorVariants.find(
                (color) => color.value === selectedColor
              )?.value}
          </span>
        </h5>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.colorVariants.map((item, i) => (
            <Fragment key={i}>
              <input
                type="radio"
                className="absolute hidden"
                autoComplete="off"
                checked={selectedColor === item.value}
                onChange={() => handleColorChange(item.value)}
              />
              <label
                className={`bg-gray-100 py-1 px-4 rounded-full border ${
                  mode === "dark"
                    ? "dark:bg-slate-800 border-blue-600 hover:bg-slate-700"
                    : "border-blue-600 border-opacity-20 hover:bg-gray-200"
                } text-sm cursor-pointer mt-1`}
                onClick={() => handleColorChange(item.value)}
              >
                {item.label}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

const SizeVariant = () => {
  const [selectedSize, setSelectedSize] = useState("XXS");
  const { mode } = useContext(MyContext);
  const handleSizeChange = (value) => {
    if (product.sizeVariants.find((size) => size.value === value)?.disabled) {
      return;
    }
    setSelectedSize(value);
  };

  return (
    <>
      <div className="mb-6">
        <h5 className="font-medium mb-2">
          Size:{" "}
          <span className="opacity-50">
            {selectedSize &&
              product.sizeVariants.find((size) => size.value === selectedSize)
                ?.title}
          </span>
        </h5>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.sizeVariants.map((size) => (
            <React.Fragment key={size.label}>
              <input
                type="radio"
                className="absolute hidden"
                autoComplete="off"
                checked={selectedSize === size.label}
                onChange={() => handleSizeChange(size.label)}
              />
              <label
                className={`bg-gray-100 py-1 px-4 rounded-full border text-sm mt-1
                                ${
                                  mode === "dark"
                                    ? "bg-slate-800 hover:bg-blue-100/[0.2] text-white"
                                    : "border-blue-200 hover:bg-gray-200"
                                }  ${
                  size.disabled
                    ? "line-through opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => handleSizeChange(size.value)}
              >
                {size.label}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

const ProductsInfo = () => {
  const { mode } = useContext(MyContext);
  const [formData, setFormData] = useState({
    color: "Multi",
    size: "XL",
    qty: 1,
  });

  const setField = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section
      className={`py-14 md:py-24 relative overflow-hidden z-10 ${
        mode === "dark" ? "bg-[#0b1727] text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 relative">
            <ProductPreviews previews={product.previews} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6 lg:mb-12">
              <h1 className="text-2xl leading-none md:text-4xl font-medium mb-4">
                {product.title}
              </h1>
              <p className="opacity-70 mb-6">
                {product.rating.toFixed(1)} out of ({product.rateCount}){" "}
                <a href="#!" className="text-blue-600 font-medium ml-1">
                  Reviews
                </a>
              </p>
              <h3 className="text-2xl text-blue-600 font-medium">
                Rs. {product.price}
              </h3>
            </div>

            <form action="#!">
              <div className="mb-6">
                <ColorVariant />
              </div>
              <div className="mb-6">
                <SizeVariant />
              </div>
              <div className="mb-6">
                <h5 className="font-medium mb-2">QTY</h5>
                <QtyField onChange={setField} name="qty" value={formData.qty} />
              </div>

              <div className="flex items-center my-7">
                <button className="bg-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-6 py-2.5 mr-2">
                  Add To Cart
                </button>
                <button className="bg-blue-600 text-white rounded text-xl hover:bg-opacity-90 py-1.5 px-3 mr-2">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2">
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </div>

              <p className="opacity-70 lg:mr-56 xl:mr-80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nec consequat lorem. Maecenas elementum at diam consequat
                bibendum.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsInfo;

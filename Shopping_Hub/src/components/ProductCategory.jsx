import React, { useContext } from "react";
import PropTypes from "prop-types";
import MyContext from "../context/MyContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 650 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 650, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const products = [
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product25.jpg",
    title: "Mobile & Accessories",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product26.jpg",
    title: "TV, Applications & Electronics",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product35.jpg",
    title: "Men's Fashion",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product28.jpg",
    title: "Womens Fashion",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product29.jpg",
    title: "Home & Kitchen",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg",
    title: "Beauty , Health & Grocerries",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg",
    title: "Sports Fitness",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg",
    title: "Toyes & Baby Products",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg",
    title: "Books",
  },
];

const ProductItem = ({ product }) => {
  const { mode } = useContext(MyContext);

  return (
    <Link to={`/search/${product.title}`}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-44 h-44 flex justify-center items-center">
          <img
            draggable="false"
            src={product?.img}
            className="rounded-full  max-w-full max-h-full w-auto "
            alt={product?.title}
          />
        </div>
        <div className="p-4 md:p-6">
          <h2
            className={`text-base font-bold leading-none my-2 text-center ${
              mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            {product?.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

const ProductCat = () => {
  const { mode } = useContext(MyContext);

  return (
    <section
      className={`ezy__epcategory3 light py-14 md:py-24 ${
        mode === "dark" ? "bg-[#0b1727] text-white" : "bg-white text-zinc-900"
      } relative overflow-hidden z-10`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-center items-center text-center md:text-start">
          <h2
            className={`text-2xl leading-none md:text-[40px] font-bold mb-2 ml-3 ${
              mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            Shop By Category
          </h2>
        </div>

        <div className="py-5">
          <Carousel responsive={responsive}>
            {products.map((product, i) => (
              <div className="py-2" key={i}>
                <ProductItem product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductCat;

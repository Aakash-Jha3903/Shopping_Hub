import { useParams } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { useProductDetailQuery } from "../../service/product";
import Rating from "../../components/Rating";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

const ProductPage = () => {
  const { productId } = useParams();
  const { mode } = useContext(MyContext);
  const {
    data: detailData,
    error: detailError,
    isLoading: deatilIsLoading,
  } = useProductDetailQuery(productId);
  console.log(detailData);
  const product = detailData?.data;

  return (
    <div>
      {deatilIsLoading ? (
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
      ) : (
        <div className="container mx-auto p-4">
          {/* Main Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section: Images */}
            <div className="flex-1 ">
              <div className="sticky top-28  flex flex-col justify-center items-center mt-24">
                <div className="h-80">
                  <img
                    className="w-full h-full object-contain rounded"
                    src={product.product_photo}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.product_photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Product image ${index + 1}`}
                      className="w-20 h-20 object-contain rounded shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Right Section: Product Details */}
            <div className="flex-1">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.product_title}</h1>

                <div>
                  <div className="flex gap-2">
                    <Rating rating={product.product_star_rating} />
                    <div className="flex gap-3">
                      <p className="text-gray-600">
                        ({product.product_star_rating})
                      </p>
                      <p className="text-gray-600">
                        {product.product_num_ratings} ratings
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs -mt-5 pb-5">
                    {product.sales_volume}
                  </p>
                  <p className="pt-5 border-t-2 text-xl text-gray-700">
                    {product.product_original_price &&
                      product.product_price && (
                        <span className="text-red-600 text-3xl">
                          -
                          {(
                            ((parseFloat(
                              product.product_original_price.replace(
                                /[^0-9.-]+/g,
                                ""
                              )
                            ) -
                              parseFloat(
                                product.product_price.replace(/[^0-9.-]+/g, "")
                              )) /
                              parseFloat(
                                product.product_original_price.replace(
                                  /[^0-9.-]+/g,
                                  ""
                                )
                              )) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      )}
                    <span className="text-3xl font-normal pl-3">
                      ₹{product.product_price}
                    </span>
                    <p className="flex gap-2 font-medium text-gray-500">
                      <p className="text-sm">M.R.P:</p>
                      {product.product_original_price && (
                        <span className="text-sm line-through">
                          {product.product_original_price}
                        </span>
                      )}
                    </p>
                  </p>
                </div>
                <p className="text-gray-700">{product.product_availability}</p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded shadow">
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                  </button>
                  <button className="bg-red-600 text-white py-2 px-4 rounded shadow">
                    <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                  </button>
                </div>
              </div>

              {/* About Section */}
              <div className="mt-5 border-t-2 pt-5">
                <h3 className="text-xl font-semibold mb-4">
                  About this product
                </h3>
                <ul className="list-disc list-inside">
                  {product.about_product.map((point, index) => (
                    <li key={index} className="text-gray-700 mb-2">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Description Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-700">{product.product_description}</p>
              </div>
              {/* Specifications Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <ul className="list-inside">
                  {Object.entries(product.product_information).map(
                    ([key, value], index) => (
                      <li key={index} className="text-gray-700 mb-2">
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="mb-4">
              {Object.entries(product.rating_distribution).map(
                ([rating, percentage], index) => (
                  <div key={index} className="text-gray-700">
                    {rating} stars: {percentage}
                  </div>
                )
              )}
            </div>
            <div className="review-aspects">
              {Object.entries(product.review_aspects).map(
                ([aspect, sentiment], index) => (
                  <div key={index} className="text-gray-700">
                    {aspect}: {sentiment}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

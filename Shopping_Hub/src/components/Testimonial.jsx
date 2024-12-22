import React, { Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import MyContext from "../context/MyContext";

const testimonialList = [
  {
    author: {
      fullName: "Akshay Kumar",
      picture: "https://cdn.easyfrontend.com/pictures/users/user2.jpg",
      designation: "Founder / CEO",
    },
    rating: 3.5,
    description:
      "This is a factor in the economy of a nation, and the administration takes the major choices.This is a factor of a nation.",
  },
  {
    author: {
      fullName: "Raima Sen",
      picture: "https://cdn.easyfrontend.com/pictures/users/user3.jpg",
      designation: "Business Head",
    },
    rating: 3.8,
    description:
      "Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis qui.",
  },
  {
    author: {
      fullName: "Arjun Kapur",
      picture: "https://cdn.easyfrontend.com/pictures/users/user27.jpg",
      designation: "UI Design",
    },
    rating: 4.5,
    description:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind.",
  },
];

const Rating = ({ rating, showLabel, className, ...rest }) => (
  <p className={classNames("mb-6", className)} {...rest}>
    <span>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";
        if (index <= Math.floor(rating))
          content = (
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          );
        else if (rating > i && rating < index + 1)
          content = (
            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
          );
        else if (index > rating)
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-200 dark:text-opacity-20"
            />
          );

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    {showLabel && <span>{rating.toFixed(1)}</span>}
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

const TestimonialItem = ({ testimonial }) => {
  const { mode } = useContext(MyContext);

  return (
    <div
      style={{
        backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "white",
        color: mode === "dark" ? "white" : "black",
      }}
      className="shadow-xl rounded-2xl transition duration-300 h-full p-6"
    >
      <div className="mt-4">
        <Rating rating={testimonial.rating} showLabel={false} />
        <p className="opacity-50 mb-6">{testimonial.description}</p>
        <div className="flex items-center">
          <div className="mr-2">
            <img
              src={testimonial.author.picture}
              alt={testimonial.author.fullName}
              className="max-w-full h-auto rounded-full border"
              width="47"
            />
          </div>
          <div>
            <h4 className="text-xl font-medium">
              {testimonial.author.fullName}
            </h4>
            <p className="text-sm">
              <i>{testimonial.author.designation}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TestimonialItem.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

export const Testimonial1 = () => {
  const { mode } = useContext(MyContext);

  return (
    <section
      className="ezy__testimonial1 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white"
      style={{
        backgroundColor: mode === "dark" ? "#0b1727" : "white",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-center md:mb-6">
          <div className="sm:max-w-lg text-center">
            <h2 className="text-3xl leading-none md:text-[45px] font-bold mb-4">
              Community Reviews
            </h2>
            <p>
              Its easier to reach your savings goals when you have the right
              savings account. Take a look and find the right one for you!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6 pt-8">
          {testimonialList.map((testimonial, i) => (
            <div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
              <TestimonialItem testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

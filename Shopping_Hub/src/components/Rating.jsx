import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Rating = ({ rating }) => (
  <p className="mb-6">
    <span>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";
        if (index <= Math.floor(rating)) {
          content = (
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          );
        } else if (index === Math.ceil(rating) && !Number.isInteger(rating)) {
          content = (
            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
          );
        } else {
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-400 dark:text-opacity-20"
            />
          );
        }

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;

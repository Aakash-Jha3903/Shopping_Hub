import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";

class HeroSection extends Component {
  render() {
    return (
      <Carousel
        showArrows={false}
        showThumbs={false}
        infiniteLoop={true}
        emulateTouch={true}
        autoPlay={true}
        showStatus={false}
        dynamicHeight={true}
      >
        <div>
          <img src={image1} className="h-[500px] object-cover" />
          {/* <p className="image">Legend 1</p> */}
        </div>
        <div>
          <img src={image2} className="h-[500px] object-cover" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        {/* <div>
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
        </div> */}
      </Carousel>
    );
  }
}

export default HeroSection;

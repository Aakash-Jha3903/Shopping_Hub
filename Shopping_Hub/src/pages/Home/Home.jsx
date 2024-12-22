import React from "react";
import HeroSection from "../../components/HeroSection";
import Filter from "../../components/Filter";
import { Testimonial1 } from "../../components/Testimonial";
import Incentives3 from "../../components/Track";
import Product from "../../components/ProductPage";
import ProductCat from "../../components/ProductCategory";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductCat />
      {/* <Filter /> */}
      <Product />
      <Testimonial1 />
      <Incentives3 />
    </div>
  );
};

export default Home;

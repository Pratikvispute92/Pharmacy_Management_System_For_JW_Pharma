import React from "react";
import Search from "./Search";
import Carousel from "./Carousel";
import MedicineSection from "./MedicineSection";
import General from "./General";

export default function Home() {
  return (
    <>
      {/* search  */}
      <Search />

      {/* carousel */}
      <Carousel />

      {/* dropdown */}
      <MedicineSection />

      {/* General  */}
      <General />
    </>
  );
}

import React from "react";
import c1 from "../assets/carousel/1.jpg";
import c2 from "../assets/carousel/2.jpg";
import c3 from "../assets/carousel/3.jpg";
// import c1 from "../assets/carousel/c1.jpeg";
// import c2 from "../assets/carousel/c2.jpeg";
// import c3 from "../assets/carousel/c3.jpeg";

export default function Carousel() {
  return (
    <>
      {/* Carousel start */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={c1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={c2} className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={c3} className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Carousel end */}
    </>
  );
}

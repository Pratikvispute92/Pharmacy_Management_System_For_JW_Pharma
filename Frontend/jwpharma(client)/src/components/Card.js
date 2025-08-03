import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.css";

import m1 from "../assets/medicine/m1.jpeg";
import m2 from "../assets/medicine/m2.jpeg";
import m3 from "../assets/medicine/m3.jpeg";
import m4 from "../assets/medicine/m4.jpeg";
import m5 from "../assets/medicine/m5.jpeg";
import m6 from "../assets/medicine/m6.jpeg";
import m7 from "../assets/medicine/m7.jpeg";
import m8 from "../assets/medicine/m8.jpeg";
import m9 from "../assets/medicine/m9.jpeg";
import m10 from "../assets/medicine/m10.jpeg";

export default function Card({ medicines }) {
  const navigate = useNavigate();

  if (!Array.isArray(medicines)) {
    return <p>No medicines available</p>;
  }

  const handleCardClick = (medicine) => {
    console.log("Medicine object:", medicine);
    navigate("/product", { state: { medicine } });
    window.scroll(0, 0);
  };

  const images = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

  return (
    <div className="container">
      <div className="row">
        {medicines.length > 0 ? (
          medicines.map((medicine, index) => (
            <div key={medicine.id} className="col-6 col-sm-4 col-lg-2 mb-4">
              <div
                className="card med-card"
                onClick={() => handleCardClick(medicine)}
              >
                <img
                  src={images[index % images.length]}
                  alt={medicine.name}
                  className="card-img-top med-img"
                />
                <div className="card-body">
                  <h2 className="card-title">{medicine.name}</h2>
                  <p>${medicine.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No medicines found</p>
        )}
      </div>
    </div>
  );
}

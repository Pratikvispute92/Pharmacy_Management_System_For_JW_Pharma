import React, { useEffect, useState, useMemo } from "react";

export default function Dropdown({ onCategorySelect }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/medicines")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        return response.json();
      })
      .then((data) => {
        setMedicines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading medicines:", err);
        setError("Failed to load medicines. Please try again later.");
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () =>
      medicines.length > 0
        ? [...new Set(medicines.map((medicine) => medicine.category))]
        : [],
    [medicines]
  );

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    const filteredMedicines = medicines.filter(
      (medicine) => medicine.category === category
    );
    onCategorySelect(filteredMedicines);
  };

  return (
    <div className="container dp">
      {loading ? (
        <p>Loading medicines...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="dropdown-container">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category}
                className="dropdown"
                onClick={() => handleCategoryClick(category)}
              >
                <button
                  className={`dropbtn ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </button>
              </div>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      )}
    </div>
  );
}

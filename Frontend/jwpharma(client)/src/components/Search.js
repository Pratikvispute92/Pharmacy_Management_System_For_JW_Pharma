import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Search() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch("http://localhost:9000/api/medicines") // Adjust the URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        return response.json();
      })
      .then((data) => setMedicines(data))
      .catch((err) => {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredMedicines([]);
    } else {
      const results = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicines(results);
    }
  }, [query, medicines]);

  const handleMedicineClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  return (
    <div className="container mt-5">
      <form className="search-form d-flex" role="search">
        <div className="search-container">
          <input
            className="form-control search"
            type="search"
            placeholder="Search medicines..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn search-btn"
            type="button"
            onClick={() => setQuery("")}
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-128.png"
              alt="search"
              className="image-fluid"
              height={25}
              width={25}
            />
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {filteredMedicines.length > 0 && (
        <div className="search-results mt-3">
          <ul className="list-group">
            {filteredMedicines.map((medicine) => (
              <li
                key={medicine.id}
                className="list-group-item clickable"
                onClick={() => handleMedicineClick(medicine.id)}
                style={{ cursor: "pointer" }} // Make it look clickable
              >
                <strong>{medicine.name}</strong> - {medicine.category} - $
                {medicine.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

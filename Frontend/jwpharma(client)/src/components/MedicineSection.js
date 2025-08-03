import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Card from "./Card";

export default function MedicineSection() {
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleCategorySelect = (medicines) => {
    setSelectedMedicines(medicines);
  };

  return (
    <div className="container">
      <Dropdown onCategorySelect={handleCategorySelect} />
      {selectedMedicines.length > 0 && <Card medicines={selectedMedicines} />}
    </div>
  );
}

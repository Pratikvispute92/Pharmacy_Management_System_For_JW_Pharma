import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api/medicines",
});

// Fetch all medicines
export const getAllMedicines = async () => {
  const response = await api.get("");
  return response.data;
};

// Create a new medicine (multipart/form-data)
export const createMedicine = async (medicine) => {
  try {
    const response = await api.post("", medicine, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating medicine:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing medicine (multipart/form-data)
export const updateMedicine = async (id, medicine) => {
  try {
    const response = await api.put(`/update/${id}`, medicine, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating medicine:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a medicine
export const deleteMedicine = async (id) => {
  try {
    await api.delete(`/delete/${id}`);
  } catch (error) {
    console.error(
      "Error deleting medicine:",
      error.response?.data || error.message
    );
    throw error;
  }
};

import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../../services/medicineService";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "",
    manufacturer: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const data = await getAllMedicines();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      Object.entries(newMedicine).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const createdMedicine = await createMedicine(formData);
      setMedicines([...medicines, createdMedicine]);
      setNewMedicine({
        name: "",
        category: "",
        manufacturer: "",
        price: "",
        image: null,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating medicine:", error);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditData({ ...medicine, image: medicine.image }); // Keep old image reference
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const updatedMedicine = await updateMedicine(editingId, formData);
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine.id === editingId ? updatedMedicine : medicine
        )
      );
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine.id !== id)
      );
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Medicines
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add New Medicine"}
      </Button>

      {showForm && (
        <Box>
          <TextField
            label="Name"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, name: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <TextField
            label="Category"
            value={newMedicine.category}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, category: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <TextField
            label="Manufacturer"
            value={newMedicine.manufacturer}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, manufacturer: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            value={newMedicine.price}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, price: e.target.value })
            }
            sx={{ mr: 2 }}
          />
          <input
            type="file"
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, image: e.target.files[0] })
            }
          />
          <Button variant="contained" onClick={handleCreate} sx={{ mt: 2 }}>
            Save Medicine
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: "16px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="medicines table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Manufacturer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>{medicine.id}</TableCell>
                <TableCell>
                  {editingId === medicine.id ? (
                    <TextField
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    medicine.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === medicine.id ? (
                    <TextField
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                    />
                  ) : (
                    medicine.category
                  )}
                </TableCell>
                <TableCell>
                  {editingId === medicine.id ? (
                    <TextField
                      value={editData.manufacturer || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          manufacturer: e.target.value,
                        })
                      }
                    />
                  ) : (
                    medicine.manufacturer
                  )}
                </TableCell>
                <TableCell>
                  {editingId === medicine.id ? (
                    <TextField
                      type="number"
                      value={editData.price || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, price: e.target.value })
                      }
                    />
                  ) : (
                    medicine.price
                  )}
                </TableCell>
                <TableCell>
                  {editingId === medicine.id ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            image: e.target.files[0] || medicine.image,
                          })
                        }
                      />
                      {editData.image && (
                        <img
                          src={editData.image}
                          alt="Medicine"
                          width="50"
                          height="50"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={medicine.image}
                      alt="Medicine"
                      width="50"
                      height="50"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingId === medicine.id ? (
                    <>
                      <IconButton color="success" onClick={handleSave}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setEditingId(null)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(medicine)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(medicine.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Medicines;

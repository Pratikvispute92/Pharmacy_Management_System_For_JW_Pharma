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
import axios from "axios";

const API_URL = "http://localhost:9000/api/delivery-persons";
const ASSIGN_URL = "http://localhost:9000/api/delivery-assignments";

const Deliverables = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [assigning, setAssigning] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    contact: "",
    vehicle: "",
  });

  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
    contact: "",
    vehicle: "",
  });

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  const fetchDeliveryPersons = async () => {
    try {
      const response = await axios.get(API_URL);
      setDeliveryPersons(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching delivery persons", error);
    }
  };

  const handleEdit = (person) => {
    setEditingId(person.id);
    setEditData({ ...person });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, editData);
      fetchDeliveryPersons();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating delivery person", error);
      alert("Failed to update delivery person.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setDeliveryPersons(deliveryPersons.filter((person) => person.id !== id));
    } catch (error) {
      console.error("Error deleting delivery person", error);
    }
  };

  const handleAssign = async (id) => {
    setAssigning(id);
    try {
      await axios.post(`${ASSIGN_URL}/${id}/assign`, {
        deliveryDate: new Date().toISOString(), // Provide actual delivery details
        status: "Assigned",
      });
      alert("Delivery assigned successfully");
    } catch (error) {
      console.error("Error assigning delivery", error);
      alert("Error assigning delivery");
    } finally {
      setAssigning(null);
    }
  };
  const handleAdd = async () => {
    try {
      const response = await axios.post(API_URL, newPerson, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeliveryPersons([...deliveryPersons, response.data]);
      setNewPerson({ name: "", email: "", contact: "", vehicle: "" });
    } catch (error) {
      console.error("Error adding new delivery person", error);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Deliverables
        </Typography>
      </Box>

      {/* Add New Delivery Person */}
      <Box component={Paper} sx={{ p: 2, borderRadius: "16px" }}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
          Add New Delivery Person
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="Name"
            value={newPerson.name}
            onChange={(e) =>
              setNewPerson({ ...newPerson, name: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Email"
            value={newPerson.email}
            onChange={(e) =>
              setNewPerson({ ...newPerson, email: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Contact"
            value={newPerson.contact}
            onChange={(e) =>
              setNewPerson({ ...newPerson, contact: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Vehicle"
            value={newPerson.vehicle}
            onChange={(e) =>
              setNewPerson({ ...newPerson, vehicle: e.target.value })
            }
            size="small"
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            <AddIcon /> Add
          </Button>
        </Stack>
      </Box>

      {/* Delivery Persons Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: "16px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="delivery persons table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Vehicle</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryPersons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.id}</TableCell>
                <TableCell>
                  {editingId === person.id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    person.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === person.id ? (
                    <TextField
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    person.email
                  )}
                </TableCell>
                <TableCell>
                  {editingId === person.id ? (
                    <TextField
                      value={editData.contact}
                      onChange={(e) =>
                        setEditData({ ...editData, contact: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    person.contact
                  )}
                </TableCell>
                <TableCell>
                  {editingId === person.id ? (
                    <TextField
                      value={editData.vehicle}
                      onChange={(e) =>
                        setEditData({ ...editData, vehicle: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    person.vehicle
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingId === person.id ? (
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
                        onClick={() => handleEdit(person)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(person.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Button
                        color="success"
                        onClick={() => handleAssign(person.id)}
                      >
                        Assign
                      </Button>
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

export default Deliverables;

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { userId } = useParams();
  const isEditMode = Boolean(userId);

  useEffect(() => {
    if (isEditMode) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/users/${id}`);
      console.log(response.data);

      setUser({
        name: response.data.name,
        email: response.data.email,
        password: "", // Do not fetch password for security reasons
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const userData = isEditMode
        ? { name: user.name, email: user.email }
        : user;

      if (isEditMode) {
        await axios.put(
          `http://localhost:9000/api/users/update/${userId}`,
          userData
        );
      } else {
        await axios.post(`http://localhost:9000/api/users/create`, user);
      }
      navigate("/");
    } catch (error) {
      console.error(
        "Error saving user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          {isEditMode ? "Edit User" : "Create User"}
        </Typography>
      </Box>
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        fullWidth
        disabled={isEditMode} // Disable password field in edit mode
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEditMode ? "Update User" : "Create User"}
      </Button>
    </Stack>
  );
};

export default UserForm;

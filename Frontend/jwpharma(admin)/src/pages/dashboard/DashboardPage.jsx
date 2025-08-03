import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, CircularProgress } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChart from "../../components/charts/BarChart";
import axios from "axios";

const DashboardPage = () => {
  const [counts, setCounts] = useState({
    users: 0,
    deliveries: 0,
    medicines: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, deliveriesRes, medicinesRes] = await Promise.all([
          axios.get("http://localhost:9000/api/users/count"),
          axios.get("http://localhost:9000/api/delivery-persons/count"),
          axios.get("http://localhost:9000/api/medicines/count"),
        ]);

        setCounts({
          users: usersRes.data.count || 0,
          deliveries: deliveriesRes.data.count || 0,
          medicines: medicinesRes.data.count || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = [
    { title: "Total Users", value: counts.users, icon: <AssessmentIcon /> },
    {
      title: "Total Deliverables",
      value: counts.deliveries,
      icon: <AssessmentIcon />,
    },
    {
      title: "Total Medicines",
      value: counts.medicines,
      icon: <AssessmentIcon />,
    },
  ];

  return (
    <Box>
      <Stack>
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "text.primary" }}
        >
          Dashboard
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {loading ? (
          <CircularProgress sx={{ marginTop: "1rem" }} />
        ) : (
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "background.paper",
              marginTop: "1rem",
            }}
          >
            {data.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <Box sx={{ marginLeft: "1rem" }}>
                  <Typography sx={{ fontSize: "1.2rem" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        )}

        <Box sx={{ marginTop: "1rem" }}>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "background.paper",
            }}
          >
            <BarChart />
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;

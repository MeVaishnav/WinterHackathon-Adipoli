import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Vendor Trust Dashboard
      </Typography>
      <Typography>
        Here you will show cards, metrics, monitoring UI, loan predictor, etc.
      </Typography>
    </Box>
  );
};

export default Dashboard;

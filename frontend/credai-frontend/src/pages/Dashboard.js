import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import StatsGrid from "../components/dashboard/StatsGrid";
import dashboardData from "../data/dashboardData";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Future: fetch("/api/dashboard")...
    setTimeout(() => {
      setData(dashboardData);
    }, 200);
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600}>
        Vendor Trust Dashboard
      </Typography>

      <StatsGrid data={data} />
    </Box>
  );
}

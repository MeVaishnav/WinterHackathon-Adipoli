import React from "react";
import { Box, TextField, Button } from "@mui/material";

const Topbar = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      <TextField size="small" placeholder="Search vendors..." />
      <Button variant="contained">+ Add Vendor</Button>
    </Box>
  );
};

export default Topbar;
